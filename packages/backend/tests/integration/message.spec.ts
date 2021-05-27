import { MessageService } from "@Messages/message.service";

const data = {
  getNode: {
    message: "",
    response: ""
  },
  getVal: {
    message: "What patients have taken drug Loratadine 5 MG Chewable Tablet?",
    response: "The patients with this drug are: Cristina921, Emile522",
  },
  getEncounterlessNode: {
    message: "what is the address of cristina921?",
    response: "The address data for patient Cristina921 is: 496 McGlynn Burg Suite 36"
  },
  getEncounterlessVal: {
    message: "what patients have address 496 McGlynn Burg Suite 36",
    response: "This patients with this address are: Cristina921"
  },
  getSame: {
    message: "",
    response: ""
  }
};

describe("Chat Events", () => {
  const messageService = new MessageService();

  it("client should receive a correct answer when asking getNode question", async (done) => {
    const currentTestData = data['getNode'];
    const result = await messageService.getMessages({id: 1, message: currentTestData.message});
    expect(result).toEqual([currentTestData.response]);
    done();
  });

  it("client should receive a correct answer when asking getVal question", async (done) => {
    const currentTestData = data['getVal'];
    const result = await messageService.getMessages({id: 1, message: currentTestData.message});
    expect(result).toEqual([currentTestData.response]);
    done();
  });

  it("client should receive a correct answer when asking getEncounterlessNode question", async (done) => {
    const currentTestData = data['getEncounterlessNode'];
    const result = await messageService.getMessages({id: 1, message: currentTestData.message});
    expect(result).toEqual([currentTestData.response]);
    done();
  });

  it("client should receive a correct answer when asking getEncounterlessVal question", async (done) => {
    const currentTestData = data['getEncounterlessVal'];
    const result = await messageService.getMessages({id: 1, message: currentTestData.message});
    expect(result).toEqual([currentTestData.response]);
    done();
  });

  it("client should receive a correct answer when asking getSame question", async (done) => {
    const currentTestData = data['getSame'];
    const result = await messageService.getMessages({id: 1, message: currentTestData.message});
    expect(result).toEqual([currentTestData.response]);
    done();
  });
});