const currencySelectFrom = document.getElementById("currency--from--select");
const currencySelectTo = document.getElementById("currency--to--select");
const moneyFrom = document.querySelector(".money--left");
const moneyTo = document.querySelector(".money--right");
const currencySymbolFrom = document.querySelector(".currency--symbol--from");
const currencySymbolTo = document.querySelector(".currency--symbol--to");
const apiKey = "DNBGYNmIR67BJEN4RocvsA==IUfmFuRE0jFSJgcy";

let selectedValueFrom = "USD";
let selectedValueTo = "USD";
let valueFrom = 0;
const currencySymbols = {
  USD: "$",
  EUR: "€",
  JPY: "¥",
  GBP: "£",
  RON: "lei",
  AUD: "A$",
  CAD: "C$",
  CHF: "CHF",
  CNY: "¥",
  HKD: "HK$",
  NZD: "NZ$",
  SEK: "kr",
  NOK: "kr",
  DKK: "kr",
  SGD: "S$",
  MXN: "MX$",
  INR: "₹",
  RUB: "₽",
  ZAR: "R",
  BRL: "R$",
  TRY: "₺",
  KRW: "₩",
  PLN: "zł",
  THB: "฿",
  IDR: "Rp",
  MYR: "RM",
};
currencySymbolFrom.textContent = currencySymbols[selectedValueFrom];
currencySymbolTo.textContent = currencySymbols[selectedValueTo];

currencySelectFrom.addEventListener("change", (event) => {
  selectedValueFrom = event.target.value;
  currencySymbolFrom.textContent = currencySymbols[selectedValueFrom];

  // Reset the input fields
  moneyFrom.value = "";
  moneyTo.value = "";
  valueFrom = 0;
});

currencySelectTo.addEventListener("change", (event) => {
  selectedValueTo = event.target.value;
  currencySymbolTo.textContent = currencySymbols[selectedValueTo];

  // Reset the input fields
  moneyFrom.value = "";
  moneyTo.value = "";
  valueFrom = 0;
});

moneyFrom.addEventListener("input", (event) => {
  valueFrom = event.target.value;
  convertCurrency();
});

const convertCurrency = () => {
  if (valueFrom === "") {
    moneyTo.value = "";
    return;
  }

  let url = `https://api.api-ninjas.com/v1/convertcurrency?have=${selectedValueFrom}&want=${selectedValueTo}&amount=${valueFrom}`;

  fetch(url, {
    method: "GET",
    headers: { "X-Api-Key": apiKey },
    contentType: "application/json",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((result) => {
      // Update the UI with the converted currency value
      const convertedValue = result.new_amount;
      moneyTo.value = convertedValue;
    })
    .catch((error) => {
      // Display an error message to the user
      console.error("Error:", error);
      alert(
        "There was an error converting the currency. Please try again later."
      );
    });
};

// Initial conversion
convertCurrency();
