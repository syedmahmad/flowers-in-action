import { NextResponse } from "next/server";
import { loadMonth } from "@/lib/hisab/storage";
import { summarizeMonth } from "@/lib/hisab/calc";
import { todayIsoPakistan } from "@/lib/hisab/date";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  // Protect the route: ensure it is called by Vercel Cron
  // Set CRON_SECRET in Vercel Environment Variables
  const authHeader = request.headers.get("authorization");
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const today = todayIsoPakistan(); // e.g., "2026-11-10"
    const [yearStr, monthStr] = today.split("-");
    const year = parseInt(yearStr, 10);
    const month = parseInt(monthStr, 10);

    const data = await loadMonth(year, month);
    const summary = summarizeMonth(data);

    // Prepare JSON payload
    const payload = {
      monthSummary: {
        year: summary.year,
        month: summary.month,
        totalSales: summary.sales,
        salesCash: summary.salesCash,
        salesOnline: summary.salesOnline,
        totalExpenses: summary.expenses,
        netProfit: summary.net,
      },
      dailyDetails: summary.days.map((d) => ({
        date: d.date,
        sales: d.sales,
        expenses: d.expenses,
        net: d.net,
        entryCount: d.entryCount,
      })),
      rawBackup: data // Include raw data to prevent data loss!
    };

    // If email is configured, send the JSON
    if (process.env.SMTP_EMAIL && process.env.SMTP_PASSWORD) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SMTP_EMAIL,
          pass: process.env.SMTP_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: process.env.SMTP_EMAIL,
        to: "syedmahmad099@gmail.com",
        subject: `Weekly Hisab Backup & Summary - ${today}`,
        text: `Hello, here is your weekly Hisab summary and backup. Total Net Profit so far this month: ${summary.net} PKR.\n\nPlease find the detailed JSON attached.`,
        attachments: [
          {
            filename: `hisab-backup-${year}-${month}-${today}.json`,
            content: JSON.stringify(payload, null, 2),
            contentType: "application/json",
          },
        ],
      });
    } else {
      console.warn("SMTP_EMAIL and SMTP_PASSWORD not configured. Skipping email.");
    }

    // CallMeBot Free API for WhatsApp (Optional)
    // Send a simple summary message to WhatsApp if CALLMEBOT_API_KEY is configured
    if (process.env.CALLMEBOT_API_KEY) {
      const phone = "+923349998990";
      const message = encodeURIComponent(
        `*Hisab Weekly Summary*\nMonth: ${month}/${year}\nTotal Sales: Rs ${summary.sales}\nTotal Expenses: Rs ${summary.expenses}\n*Net Profit: Rs ${summary.net}*`
      );
      const url = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${message}&apikey=${process.env.CALLMEBOT_API_KEY}`;
      await fetch(url);
    }

    return NextResponse.json({ success: true, message: "Report processed successfully." });
  } catch (err) {
    console.error("[hisab/cron/report]", err);
    return NextResponse.json({ error: "Failed to generate report" }, { status: 500 });
  }
}

