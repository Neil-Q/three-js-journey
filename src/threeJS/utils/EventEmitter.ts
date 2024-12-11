interface Observer {
    event: string
    callback: CallableFunction
}

class EventEmitter {

    observers: Observer[]
    
    constructor() {
        this.observers = []
    }

    notify(event: string) {
        this.observers.forEach((observer: Observer) => {
            if (observer.event === event) observer.callback()
        })
    }

    off(event: string, callback: CallableFunction) {
        const index = this.observers.findIndex(
          (observer) => observer.event === event && observer.callback === callback
        )
  
        if (index !== -1) this.observers.splice(index, 1)
    }

    on(event: string, callback: CallableFunction) {
        this.observers.push({ event, callback })
    }
}

export default EventEmitter