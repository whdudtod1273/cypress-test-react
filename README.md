- [인프런 cyress](https://www.inflearn.com/course/%EC%8B%B8%EC%9D%B4%ED%94%84%EB%A0%88%EC%8A%A4-%ED%85%8C%EC%8A%A4%ED%8A%B8)강의 예제를  
  react,typescript환경에서 테스트 해봤습니다.

## **Install and configure**

```bash
yarn add cypress --dev
```

### tsconfig.json

- tsconfig.json “compilerOptions”에 “types”:[”cypress”] 추가

```tsx
{
...
	"compilerOptions": {
		...
		+ "types": ["cypress"]
		...
	}
...
}
```

### cypress.json

- baseUrl은 cypress가 테스트할 처음 방문하는 url입니다. 해당 속성을 사용해도 각 테스트 파일마다 `cy.visit('')` 는 작성해줘야 합니다.
- [cypress.json option](https://docs.cypress.io/guides/references/configuration#Global)

```tsx
{
	"baseUrl":"http://localhost:3000"
}
```

## Example

- describe : 어떤 테스트 코드인지 하나로 묶어 주는 코드
- beforeEach : 하나의 테스트 파일이 실행되기전에 항상 실행되는 함수

```tsx
describe("couter test", () => {
  beforeEach(() => {
    // cypress.json에서 baseUrl을 http://localhost:3000로 가도록
    // 지정해줬기 때문에 cy.visit("")만 입력해주면 된다.
    cy.visit("");
  });
});
```

### 증가 버튼 테스트

- 기존 count 값을 preValue에 저장시켜 놓습니다.
- increase 버튼을 클릭한 후 count값과 preValue값을 비교해서
  count값이 잘 증가했는지 비교합니다.

```tsx
it("+ 버튼을 클릭 시 count가 1증가한다.", () => {
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
```

### 감소 버튼 테스트

- 증가 버튼을 클릭해서 count를 1로 만들어 줍니다.
- 기존 count 값을 preValue에 저장시켜 놓습니다.
- decrease 버튼을 클릭한 후 count값과 preValue값을 비교해서
  count값이 잘 감소했는지 비교합니다.

```tsx
it("- 버튼을 클릭 시 count가 1감소한다.", () => {
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
```

### 감소 버튼 조건 추가

- count가 0일때 0보다 작아지지 않는지 테스트합니다.

```tsx
it("count가 0보다 작아질 경우 더이상 감소하지 못하게 막는다.", () => {
  cy.get("[data-cy=decrease]").click();
  cy.get("[data-cy=count]").invoke("text").should("eq", "0");
});
```

### 리셋 버튼 테스트

- 증가 버튼을 클릭해서 count를 1로 만들어 줍니다.
- 리셋 버튼을 클릭한 뒤 count값이 0으로 초기화가 되는지 확인합니다.

```tsx
it("reset 버튼을 클릭 시 counter가 0으로 초기화된다.", () => {
  cy.get("[data-cy=increase]").click();
  cy.get("[data-cy=reset]").click();
  cy.get("[data-cy=count]").invoke("text").should("eq", "0");
});
```

### Select Elements

[모범사례](https://docs.cypress.io/guides/references/best-practices#Selecting-Elements)
