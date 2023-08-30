interface Close {
  command: "close"
}

interface Message {
  command: "message",
  body: {
    from: string,
    message: string
  }
}

export {
  Close,
  Message,
}