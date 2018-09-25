import Mastodon, { Status, StreamListener, Response } from "megalodon";
const BASE_URL: string = "https://pcgamer.social";

const access_token: string = "";

const client = new Mastodon(access_token, BASE_URL + "/api/v1");

const stream: StreamListener = client.stream("/streaming/user");

stream.on("update", (status: Status) => {
  console.log(status);
  if (
    status.account.username == "Eai" &&
    status.tags.some(function(e) {
      return e.name == "pcgsinfo";
    })
  ) {
    client
      .post<Status>(`/statuses/${status.id}/reblog`)
      .then((res: Response<Status>) => {
        console.log(res);
      })
      .catch(err => {
        console.error(err);
      });
  }
});

stream.on("heartbeat", () => {
  console.log("thump.");
});
