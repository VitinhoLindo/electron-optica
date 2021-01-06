interface ServerSendArg {
  pid?: number,
  data?: any,
  url?: string,
  status?: string
}

const getSendedObject = function (): { [key: string]: any } {
  return {};
}

export default function (arg?: ServerSendArg): ServerSendArg {
  let sendObject = getSendedObject();
  if (!arg) return sendObject;
  if (arg.pid)     sendObject['pid']    = arg.pid;
  if (arg.data)    sendObject['data']   = arg.data;
  if (arg.url)     sendObject['url']    = arg.url;
  if (arg.status)  sendObject['status'] = arg.status;

  return sendObject
}