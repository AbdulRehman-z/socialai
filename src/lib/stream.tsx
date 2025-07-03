import { StreamClient } from "@stream-io/node-sdk"
import { config } from "./config"

export const streamVideo = new StreamClient(config.env.STREAM_API_KEY, config.env.STREAM_API_SECRET, {
  timeout: 10000
})
