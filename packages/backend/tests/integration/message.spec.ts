import { MessageService } from "@Messages/message.service";

const data = [{
  message: "What patients have taken drug Loratadine 5 MG Chewable Tablet?",
  response: "The patients with this drug are: Cristina921, Emile522",
}];

describe("Chat Events", () => {
  const messageService = new MessageService();

  it("client should receive a correct answer", async (done) => {
    const result = await messageService.getMessages({id: 1, message: data.message});
    expect(result).toEqual([data.response]);
    done();
  });
});