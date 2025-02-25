import amqplib from "amqplib"

const rabbitConnection = async(stringConnection: string) => {
  const result = await amqplib.connect(stringConnection);
  const channelMessage  = await result.createChannel();
  return channelMessage;
}

export default rabbitConnection;
//TODO: working with the chanelMessage to see what happend with this