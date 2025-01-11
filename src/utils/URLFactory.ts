type MapCallback<V> = (value: [string, NonNullable<V>], index?: number) => [string, V]

export class URLConstructorFactory<GlobalParams extends object = Record<string, unknown>> {
  protected _baseUrl: string
  protected _paramModifier: MapCallback<GlobalParams[keyof GlobalParams]> | null

  constructor(
    baseUrl: string,
    paramModifier?: MapCallback<GlobalParams[keyof GlobalParams]>
  ) {
    this._baseUrl = baseUrl
    this._paramModifier = paramModifier ?? null
  }

  private __objectEntryWrap<T extends object>(o: T) {
    return Object.fromEntries(Object.entries(o))
  }

  createEndpoint<EndpointParams extends object = GlobalParams>(route: string, params?: Partial<EndpointParams>) {
    if (typeof route !== "string") {
      throw new TypeError(`Param 'route' should be string, but got ${typeof route}`)
    }

    /* eslint-disable-next-line prefer-const */
    let constructedUrl = []
    constructedUrl.push(this._baseUrl, route)

    console.log("this._paramModifier", this._paramModifier)

    if (params) {
      const parsedParams = this._paramModifier
        ? this.__objectEntryWrap(params).map(this._paramModifier)
        : params

      console.log(parsedParams)

      const urlParams = new URLSearchParams(Object.fromEntries(parsedParams))

      constructedUrl.push(`?${urlParams.toString()}`)
    }

    return constructedUrl.join("")
  }
}
