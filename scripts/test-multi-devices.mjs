import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const VIEWPORTS = [
  { name: "280_fold_closed", width: 280, height: 653 },
  { name: "320_iphone_se", width: 320, height: 568 },
  { name: "360_android", width: 360, height: 800 },
  { name: "390_iphone_standard", width: 390, height: 844 },
  { name: "430_iphone_max", width: 430, height: 932 },
  { name: "768_ipad_portrait", width: 768, height: 1024 },
  { name: "820_ipad_air_portrait", width: 820, height: 1180 },
  { name: "844_mobile_landscape", width: 844, height: 390 },
  { name: "1024_desktop_small", width: 1024, height: 768 },
  { name: "1180_ipad_air_landscape", width: 1180, height: 820 },
  { name: "1280_laptop", width: 1280, height: 800 },
  { name: "1440_macbook", width: 1440, height: 900 },
  { name: "1920_full_hd", width: 1920, height: 1080 },
];

async function runAudit() {
  const outputDir = path.resolve("./screenshots");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log("=== DÉBUT AUDIT MULTI-APPAREILS PLAYWRIGHT ===");

  // Tester sur le serveur local
  const targetUrl = process.env.TEST_URL || "http://localhost:3008";
  console.log(`URL testée : ${targetUrl}\n`);

  const results = [];

  for (const vp of VIEWPORTS) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto(targetUrl, { waitUntil: "networkidle" });

    // Vérification du défilement horizontal
    const overflowCheck = await page.evaluate(() => {
      const scrollWidth = document.documentElement.scrollWidth;
      const innerWidth = window.innerWidth;
      const hasHorizontalScroll = scrollWidth > innerWidth;

      // Détecter les éléments fautifs si débordement
      let overflowingElements = [];
      if (hasHorizontalScroll) {
        const allElements = document.querySelectorAll("*");
        for (const el of allElements) {
          const rect = el.getBoundingClientRect();
          if (rect.right > innerWidth + 1) {
            overflowingElements.push({
              tag: el.tagName,
              id: el.id,
              className: (el.className || "").toString().slice(0, 50),
              right: rect.right,
            });
          }
        }
      }

      return {
        scrollWidth,
        innerWidth,
        hasHorizontalScroll,
        overflowingCount: overflowingElements.length,
        overflowingSamples: overflowingElements.slice(0, 3),
      };
    });

    const screenshotPath = path.join(outputDir, `${vp.name}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: false });

    const status = overflowCheck.hasHorizontalScroll ? "❌ DÉBORDEMENT" : "✅ PARFAIT";
    console.log(
      `[${status}] ${vp.name.padEnd(24)} (${vp.width}x${vp.height}) -> scrollWidth: ${
        overflowCheck.scrollWidth
      }px / innerWidth: ${overflowCheck.innerWidth}px`
    );

    if (overflowCheck.hasHorizontalScroll) {
      console.log(`    ⚠️ Éléments en débordement :`, overflowCheck.overflowingSamples);
    }

    results.push({
      ...vp,
      ...overflowCheck,
    });
  }

  await browser.close();
  console.log("\n=== FIN DE L'AUDIT ===");
  const allPassed = results.every((r) => !r.hasHorizontalScroll);
  if (allPassed) {
    console.log("🎉 Aucun défilement horizontal sur l'ensemble des 13 résolutions testées !");
  } else {
    console.error("Des corrections sont requises sur certaines résolutions.");
    process.exit(1);
  }
}

runAudit().catch((err) => {
  console.error("Erreur Playwright :", err);
  process.exit(1);
});
