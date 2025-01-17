"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

interface YouTubeProps {
  id: string
  className?: string
}

export function YouTube(props: YouTubeProps) {
  const pathname = usePathname()

  useEffect(() => {
    const loadPlayer = () => {
      new YT.Player("player", {
        host: "https://www.youtube-nocookie.com",
        height: "100%",
        width: "100%",
        videoId: props.id,
        playerVars: {
          rel: 0,
          enablejsapi: 1,
          modestbranding: 1,
        },
        events: {
          onReady: () => {
            console.log("Player mounted")
          },
        },
      })
    }

    setTimeout(() => {
      if (window.YT) return loadPlayer()

      // Listen for DOM mutations
      // So that the player and it's event listeners will be available from any connection speed
      const headTags = new MutationObserver((mutations) => {
        for (const muts of mutations) {
          const addedNodes = Array.from(muts.addedNodes)

          const hasWidgetAPI = addedNodes.some(
            (e) => (e as HTMLScriptElement).id === "www-widgetapi-script",
          )

          if (hasWidgetAPI) {
            const checkYT = setInterval(() => {
              if (window.YT && window.YT.Player) {
                clearInterval(checkYT)
                loadPlayer()
              }
            }, 100)
          }
        }
      })

      headTags.observe(document.head, { childList: true })

      // Mount the YouTube JSAPI stuff
      const iframeTag = Object.assign(document.createElement("script"), {
        src: "https://www.youtube.com/iframe_api",
      })

      // Make sure the iframe API gets fetched first
      iframeTag.setAttribute("fetchpriority", "high")

      const firstScriptTag = document.getElementsByTagName("script")[0]
      firstScriptTag.parentNode!.insertBefore(iframeTag, firstScriptTag)

      // Unmount observer after 10 secs
      setTimeout(() => {
        console.debug("Disconnected MutObserver")
        headTags.disconnect()
      }, 1000 * 10)
      return
    }, 50)
  }, [props.id, pathname])

  return <div id="player" />
}
