// app/api/chat/route.ts
import { NextResponse } from "next/server";

const replies: Record<string, string> = {
  مرحبا: "أهلاً بك! كيف يمكنني مساعدتك؟",
  "كيف حالك": "أنا بخير، شكرًا لسألتم!",
  وداعا: "وداعًا! عد قريبًا.",
  السعر: "يمكنك طلب عرض سعر من صفحة الخدمات.",
  خدماتكم: "نوفر تصميم مواقع، تطبيقات، وحلول ذكاء اصطناعي.",
};

function getBotReply(userMessage: string): string {
  const cleanMsg = userMessage.toLowerCase().trim();

  // ابحث عن كلمة مفتاحية مباشرة
  for (const key in replies) {
    if (cleanMsg.includes(key.toLowerCase())) {
      return replies[key];
    }
  }

  return "أنا بوت بسيط، لا أفهم كل شيء بعد! 😅";
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (typeof body?.message !== "string") {
      return NextResponse.json(
        { reply: "يرجى إرسال رسالة نصية." },
        { status: 400 }
      );
    }
    const reply = getBotReply(body.message);
    return NextResponse.json({ reply });
  } catch (error) {
    console.error("[ChatBot Error]", error);
    return NextResponse.json(
      { reply: "عذرًا، حدث خطأ داخلي. حاول لاحقًا." },
      { status: 500 }
    );
  }
}
