describe("couter test", () => {
  beforeEach(() => {
    cy.visit("");
  });

  it("+ 버튼을 클릭 시 count가 1증가한다.", () => {
    // 기존 count 값을 preValue로 가져온 상태에서
    // increase 버튼을 클릭한 후 count값과 preValue값을 비교해서
    // count값이 잘 증가했는지 비교한다.
    cy.get("[data-cy=count]")
      .invoke("text")
      .then((value) => {
        const preValue = Number(value);
        cy.get("[data-cy=increase]").click();
        cy.get("[data-cy=count]")
          .invoke("text")
          .should("eq", String(preValue + 1));
      });
  });

  it("- 버튼을 클릭 시 count가 1감소한다.", () => {
    // 증가 버튼을 클릭해서 count가 1인 상태에서
    // 기존 count 값을 preValue로 가져온 상태에서
    // decrease 버튼을 클릭한 후 count값과 preValue값을 비교해서
    // count값이 잘 감소했는지 비교한다.
    cy.get("[data-cy=increase]").click();
    cy.get("[data-cy=count]")
      .invoke("text")
      .then((value) => {
        const preValue = Number(value);
        cy.get("[data-cy=decrease]").click();
        cy.get("[data-cy=count]")
          .invoke("text")
          .should("eq", String(preValue - 1));
      });
  });

  it("reset 버튼을 클릭 시 counter가 0으로 초기화된다.", () => {
    cy.get("[data-cy=increase]").click();
    cy.get("[data-cy=reset]").click();
    cy.get("[data-cy=count]").invoke("text").should("eq", "0");
  });

  it("count가 0보다 작아질 경우 더이상 감소하지 못하게 막는다.", () => {
    cy.get("[data-cy=decrease]").click();
    cy.get("[data-cy=count]").invoke("text").should("eq", "0");
  });
});

export {};
