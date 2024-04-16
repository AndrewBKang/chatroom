import { Controller } from "@hotwired/stimulus"
import consumer from "channels/consumer"

export default class extends Controller {
  static targets = [ "input", "chatbox" ]

  connect() {
    this.channel = consumer.subscriptions.create(
      { channel: "ChatroomChannel" }, {
        connected: this._connected.bind(this),
        received: this._received.bind(this),
        disconnected: this._disconnected.bind(this)
      }
    )
  }

  disconnect() {
    this.channel.unsubscribe()
  }

  send() {
    // this.chatboxTarget.innerHTML += `<div>${this.inputTarget.value}</div>`
    // this.inputTarget.value = ''

    this.channel.send({ message: this.inputTarget.value })
  }

  _connected() {
    console.log("Connected to ChatroomChannel")
  }

  _received(data) {
    console.log('received something')
    console.log(data)
    this.chatboxTarget.innerHTML += `<div>${data.message}</div>`
  }

  _disconnected() {
    console.log("Disconnected from ChatroomChannel")
  }

}
