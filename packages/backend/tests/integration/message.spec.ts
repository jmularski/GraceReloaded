import { MessageService } from "@Messages/message.service";

const data = {
  getNode: {
    message: "What drugs have Cristina921 been taking?",
    response: "The drug data for this patient is: Loratadine 5 MG Chewable Tablet, NDA020800 0.3 ML Epinephrine 1 MG/ML Auto-Injector, lisinopril 10 MG Oral Tablet, Hydrochlorothiazide 25 MG Oral Tablet, amLODIPine 2.5 MG Oral Tablet, Seasonique 91 Day Pack, Jolivette 28 Day Pack, Trinessa 28 Day Pack, Errin 28 Day Pack, Penicillin V Potassium 500 MG Oral Tablet, Etonogestrel 68 MG Drug Implant, NuvaRing 0.12/0.015 MG per 24HR 21 Day Vaginal Ring, 0.4 ML Enoxaparin sodium 100 MG/ML Prefilled Syringe, Acetaminophen 500 MG Oral Tablet"
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
    message: "what do cristina921 and emile522 have in common?",
    response: "The matching data for the patients is: Encounter for symptom, Self-care interventions (procedure), Loratadine 5 MG Chewable Tablet, NDA020800 0.3 ML Epinephrine 1 MG/ML Auto-Injector, Outpatient procedure, Encounter for problem, Body mass index 30+ - obesity (finding), Acute viral pharyngitis (disorder), Medication Reconciliation (procedure), Streptococcal sore throat (disorder), Encounter for check up (procedure), Encounter for symptom (procedure), Suspected COVID-19, Infectious disease care plan (record artifact), Face mask (physical object), Fever (finding), Cough (finding), COVID-19"
  },
  daterange: {
    message: "what conditions did delinda651 have in the last month?",
    response: "Delinda651 has no data related to any condition"
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

  it("client should receive a correct answer when asking a question with daterange", async (done) => {
    const currentTestData = data['daterange'];
    const result = await messageService.getMessages({id: 1, message: currentTestData.message});
    expect(result).toEqual([currentTestData.response]);
    done();
  });
});