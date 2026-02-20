const TelegramBot = require('node-telegram-bot-api');
const admin = require('firebase-admin');

// ১. ফায়ারবেস এডমিন সেটআপ (আপনার দেওয়া কি ব্যবহার করে)
const serviceAccount = {
    "type": "service_account",
    "project_id": "fynora-81313",
    "private_key_id": "8cd8c1d39367a55cce3c580e9cd053cffb97a25d",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEugIBADANBgkqhkiG9w0BAQEFAASCBKQwggSgAgEAAoIBAQDU4CHaqAvx15H+\nK9o1fcI4mqwN7Sw5jq8itzTul04K5HPtADf9ul2B1ZplF8L8QvATgKEg/UauB6Rw\nRqkZ2M9D836uNXXBizEOFj+ArfqyjMFwB39AsYp5R+VcyIh1BKQhuqjhuLhOBpoe\nE0yQP3J+BAB2hg52GK5dJhb5VBoWbZefz9Qctf9Yrb9y5FqU8PIfYSPiMozicO0j\nXdWz7YsFqtDwROi142ZRhIHPVDRhgImUNYdGw5TIDW++VD82Gt7RUxpDxR3rQgcK\njYR8qU4Gkdcp0flTNyUoLt1j+0kEnV0KzPK9auuf9DJa5FL1nY/I4KRMjGByjOPe\ns6VoC62TAgMBAAECgf8OQT0nsGJA9C6JaPihd8plJIiqHO6QELTOMJsRqDS2PN89\nSMZ3EpYL0osWgxMd0V2v8KP+I9MqHVjlmYyUwMtpeFJxDtpBiVm/l73NcmtXQF7Y\nRjqIY6RP6ICX/x7bAE/9X/A4Ud0qN9k+vJ5j5dvE3aRO3c/Q9B9LQh0jJ1oFlA1H\nW+K95PzVzT5hqGW6btcLZME02rx+Pk+vqH4Zp1coYtMBRUMrh7xrhGuN5zDgBoNp\nR2GM2zQsfxwQxj5qr3UQw/hA7pN4xSFeu+85ViWLte2oiJz3A9oUKPGzdlTG3bui\neiSWWAh9vyS+EJSLYVYymsGrypZAhJPYlWS50gECgYEA9CmHF7W5hiAqOVajmVjM\KyyEut4c6QgqkK2ljJ4tCIbtpLioLoSxOlELBgN97Pj4MTQ6UJPirP3Mkax2ga2T\nDPNEoZoK5DnMrowTSnFKvOQhJewh8MIuTC3Lr6W9yRNZEsAJ6QAD09rAQse6IbBS\nJ3QkskWQ7B8WDkcFZn+zuyECgYEA3zJIadTvcpdketdS/ZppF0j5AjBSOmU+nYL5\n4gbEmILSxmDdAGmgX/IGiakkwA3VvqdaDHOZ6XllKwKIDeEN97iYnKTLs6ooFmbm\nvu/bKlwJnMwfLevrlXGtgOLWnoGFNgNbsU+7sbMoUvAN6CxI6l4lKaUzVc/EC+Q1\VgUmpjMCgYB1+E6mfQ5LqOTd2WeoYwga4CKtaz4KtgBi8ROo8pANq6vMx8+y0jgT\nVi7+U9eXFOBOXc7DOgDu1p3t0KddlrETM8L4VcZnaSnlOBbmBAE5bPw7J3Fqs1fN\nRN9CWdFuAuQptBHVu0UeKnZ0ja34Mwout+Y3IHeaLpbohRYt5QvBIQKBgCKLJrfy\nc8i5c5yrfLWxUzh+W8Oh9OgCyWkZX1FDGOQ9wx9e2HV6445V5/sgSYbL3VvvjLlG\nnviKiETa1HHJdh7z2/LKcphw6lllPaspdjMdIYO5981kqQZtHJxI/0xy4UoVxPgx\nTexXvRLxAkX/rJ1RStEiN0q9qCrq+/I/Q9cPAoGAM/PzjNvU2U9WDZS31fwRHpYt\nSfX3u1bkLmxVvlS1IOJ+wdb8HvYWxgP96Fl37/c4Axz4seooFFc+tbtYjLz0OU9y\nbtpUhCTiIu1T1H8TihBjE4wLRrk+NfUwGSRsj7AuycnKvcJx5aLArziYofyyC4i/\nqnciQDUCvhrRa+5GszU=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-fbsvc@fynora-81313.iam.gserviceaccount.com",
};

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://fynora-81313-default-rtdb.firebaseio.com"
});

const db = admin.firestore();
const rtdb = admin.database();
const appId = "1:593306264446:web:da476d4c77ae4ede6b492f";

// ২. টেলিগ্রাম বট টোকেন
const token = '8376769740:AAHN9qaBUnXMrtVViwJjCHe0iVZ7EbysbOE'; 
const bot = new TelegramBot(token, {polling: true});

// ৩. আপনার মিনি অ্যাপ লিংক
const webAppUrl = 'https://amarbot.vercel.app/public; 

// ৪. ইউজারের স্টেট ট্র্যাকিং (Withdrawal এর জন্য)
const userState = {};

// ৫. মেইন মেনু বাটন (Permanent)
const mainButtons = {
    reply_markup: {
        keyboard: [
            [{ text: "🎮 Open Mini App", web_app: { url: webAppUrl } }],
            [{ text: "💰 Balance" }, { text: "👤 Profile" }],
            [{ text: "💸 Withdraw" }, { text: "👥 Referral" }],
            [{ text: "📜 Earning History" }, { text: "🏦 Payout History" }],
            [{ text: "📊 Live Status" }, { text: "⚙️ Support" }]
        ],
        resize_keyboard: true
    }
};

// ৬. ইউজার ডাটা বের করার হেল্পার ফাংশন
async function getUserData(tgId) {
    const snapshot = await db.collectionGroup('profile').where('telegramId', '==', tgId).limit(1).get();
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { id: doc.ref.parent.parent.id, data: doc.data(), ref: doc.ref.parent.parent };
}

// ৭. বট মেসেজ হ্যান্ডলিং
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, `👋 স্বাগতম ${msg.from.first_name}!\n\nEarnFast এ আপনি গেম খেলে এবং রেফার করে টাকা ইনকাম করতে পারবেন। নিচের বাটনগুলো ব্যবহার করে সরাসরি সবকিছু কন্ট্রোল করুন।`, mainButtons);
});

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    const tgId = msg.from.id;

    // Withdraw প্রসেস হ্যান্ডলিং (যদি ইউজার তথ্য দিচ্ছিল)
    if (userState[chatId] && !["💰 Balance", "👤 Profile", "💸 Withdraw", "👥 Referral"].includes(text)) {
        return handleWithdrawFlow(chatId, text, tgId);
    }

    switch (text) {
        case "💰 Balance":
            const userBal = await getUserData(tgId);
            if (userBal) {
                bot.sendMessage(chatId, `💰 **আপনার বর্তমান ব্যালেন্স:**\n\n💵 Coins: ${userBal.data.balance}\n📈 Total Earned: ${userBal.data.totalEarned}\n💎 Value: ${Math.floor(userBal.data.balance / 100)} USD (Approx)`);
            } else {
                bot.sendMessage(chatId, "❌ একাউন্ট নেই! দয়া করে 'Open Mini App' এ ক্লিক করে একাউন্ট খুলুন।");
            }
            break;

        case "👤 Profile":
            const userProf = await getUserData(tgId);
            if (userProf) {
                bot.sendMessage(chatId, `👤 **ইউজার প্রোফাইল**\n\n🏷 নাম: ${userProf.data.firstName}\n🆔 Telegram ID: ${tgId}\n🔗 রেফার কোড: ${userProf.data.referralCode}\n👥 মোট রেফারেল: ${userProf.data.totalRefers}\n📅 স্ট্যাটাস: Active ✅`);
            }
            break;

        case "👥 Referral":
            const userRef = await getUserData(tgId);
            if (userRef) {
                const link = `https://t.me/Earnfast11_bot?startapp=${userRef.data.referralCode}`;
                bot.sendMessage(chatId, `👥 **রেফার করে ইনকাম:**\n\nপ্রতিটি সফল রেফারে পাবেন ৫০০ কয়েন!\n\nআপনার ইনভাইট লিংক:\n${link}`);
            }
            break;

        case "📊 Live Status":
            const statusRef = rtdb.ref('/status');
            statusRef.once('value', (snap) => {
                const online = snap.numChildren();
                bot.sendMessage(chatId, `📊 **লাইভ রিপোর্ট:**\n\n🟢 বর্তমানে অনলাইনে আছে: ${online} জন\n💸 মোট পেমেন্ট সম্পন্ন: ২৫০+ (প্রায়)`);
            });
            break;

        case "📜 Earning History":
            const userE = await getUserData(tgId);
            if (userE) {
                const earnSnap = await userE.ref.collection('earnings').orderBy('timestamp', 'desc').limit(5).get();
                let earnMsg = "📜 **সর্বশেষ ৫টি ইনকাম:**\n\n";
                earnSnap.forEach(d => earnMsg += `✅ +${d.data().amount} - ${d.data().source}\n`);
                bot.sendMessage(chatId, earnSnap.empty ? "এখনো কোনো ইনকাম নেই।" : earnMsg);
            }
            break;

        case "🏦 Payout History":
            const userP = await getUserData(tgId);
            if (userP) {
                const paySnap = await db.collection(`artifacts/${appId}/public/data/withdrawals`)
                    .where('userId', '==', userP.id).orderBy('timestamp', 'desc').limit(5).get();
                let payMsg = "🏦 **আপনার শেষ ৫টি উইথড্র:**\n\n";
                paySnap.forEach(d => {
                    const data = d.data();
                    payMsg += `🔹 ${data.amount} Coins - ${data.status.toUpperCase()} (${data.method})\n`;
                });
                bot.sendMessage(chatId, paySnap.empty ? "কোনো পেমেন্ট হিস্ট্রি নেই।" : payMsg);
            }
            break;

        case "💸 Withdraw":
            const userW = await getUserData(tgId);
            if (userW) {
                if (userW.data.balance < 100) return bot.sendMessage(chatId, "❌ দুঃখিত! উইথড্র করতে নূন্যতম ১০০ কয়েন লাগবে।");
                userState[chatId] = { step: 1 };
                bot.sendMessage(chatId, "💸 **উইথড্রাল শুরু করুন**\n\nপেমেন্ট মেথড লিখুন (যেমন: Paytm, UPI, bKash):");
            }
            break;

        case "⚙️ Support":
            bot.sendMessage(chatId, "⚙️ **সাপোর্ট সেন্টার**\n\nযেকোনো সমস্যায় যোগাযোগ করুন:\nAdmin: @YourAdminID\nChannel: @YourChannelID");
            break;
    }
});

// ৮. উইথড্রাল ফ্লো হ্যান্ডলার (Conversation Mode)
async function handleWithdrawFlow(chatId, text, tgId) {
    const state = userState[chatId];

    if (state.step === 1) {
        state.method = text;
        state.step = 2;
        bot.sendMessage(chatId, `ঠিক আছে (${text})। এখন আপনার পেমেন্ট ডিটেইলস (Number/ID) দিন:`);
    } 
    else if (state.step === 2) {
        state.details = text;
        state.step = 3;
        bot.sendMessage(chatId, "কত কয়েন উইথড্র করতে চান? সংখ্যাটি লিখুন:");
    } 
    else if (state.step === 3) {
        const amount = parseInt(text);
        const user = await getUserData(tgId);

        if (isNaN(amount) || amount > user.data.balance || amount < 100) {
            delete userState[chatId];
            return bot.sendMessage(chatId, "❌ ভুল পরিমাণ! উইথড্র বাতিল করা হয়েছে। আবার চেষ্টা করুন।");
        }

        // ডাটাবেস আপডেট (ব্যালেন্স কমানো এবং রিকোয়েস্ট সেভ)
        await user.ref.collection('profile').doc('main').update({
            balance: admin.firestore.FieldValue.increment(-amount)
        });

        await db.collection(`artifacts/${appId}/public/data/withdrawals`).add({
            userId: user.id,
            userName: user.data.firstName,
            amount: amount,
            method: state.method,
            details: state.details,
            status: 'pending',
            timestamp: admin.firestore.FieldValue.serverTimestamp()
        });

        delete userState[chatId];
        bot.sendMessage(chatId, "✅ আপনার উইথড্রাল রিকোয়েস্ট সফল হয়েছে! ২৪-৪৮ ঘণ্টার মধ্যে পেমেন্ট পেয়ে যাবেন।", mainButtons);
    }
}

console.log("🚀 EarnFast Full Feature Bot is running...");
