import xlsx from "xlsx";
import translate from "google-translate-api-x";
import fs from "fs";
import path from "path";

const workbook = xlsx.readFile("src/locales/translations.xlsx");
const worksheet = workbook.Sheets["DATA"];
const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

// for (let i = 48; i < 49; i++) {
for (let i = 1; i < data.length; i++) {
  const text = data[i][1];
  if (!text) continue;

  try {
    const [th, zh, ja, es, my, lo, km] = await Promise.all([
      translate(text, { to: "th" }),
      translate(text, { to: "zh-CN" }),
      translate(text, { to: "ja" }),
      translate(text, { to: "es" }),
      translate(text, { to: "my" }),
      translate(text, { to: "lo" }),
      translate(text, { to: "km" }),
    ]);

    data[i][2] = th.text;
    data[i][3] = zh.text;
    data[i][4] = ja.text;
    data[i][5] = es.text;
    data[i][6] = my.text;
    data[i][7] = lo.text;
    data[i][8] = km.text;

    console.log(`✅ Row ${i + 1} translated`);
    await sleep(300);
  } catch (err) {
    console.error(`❌ Error on row ${i + 1}: ${err.message}`);
  }
}

const newSheet = xlsx.utils.aoa_to_sheet(data);
const newWb = xlsx.utils.book_new();
xlsx.utils.book_append_sheet(newWb, newSheet, "DATA");

const outputPath = "src/locales/translation_translated.xlsx";
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
xlsx.writeFile(newWb, outputPath);

console.log("✅ File saved to:", outputPath);
