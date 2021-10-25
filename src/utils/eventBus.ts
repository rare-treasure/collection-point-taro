/* eslint-disable @typescript-eslint/no-shadow */
const handlerMap: { [key: string]: any} = {}
let id = 0

class Bus {
  on(type: string, handler: any) {
    if (!(type in handlerMap)) {
      handlerMap[type] = {}
    }
    handlerMap[type][++id] = handler

    return id
  }
  off(type: string, id?: number) {
    if(!id) {
      Reflect.deleteProperty(handlerMap, type)
    }

    if(id) {
      if (type in handlerMap && id in handlerMap[type]) {
        Reflect.deleteProperty(handlerMap[type], id)
      }
    }
  }
  emit(type: string, ...args: any[]) {
    if (type in handlerMap) {
      const handlers = handlerMap[type]
      for (let key in handlers) {
        handlers[key].apply(null, args)
      }
    }
  }
  once(type: string, handler: any) {
    const { on, off } = this
    const id = on(type, (ret: any) => {
      handler(ret)
      off(type, id)
    })

    return id
  }
}

const bus = new Bus()
export default bus
