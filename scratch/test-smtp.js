const tls = require("tls");
const fs = require("fs");
const path = require("path");

// Manually parse .env file
const envPath = path.join(__dirname, "../.env");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const cleanLine = line.trim();
    if (!cleanLine || cleanLine.startsWith("#")) return;
    const firstEquals = cleanLine.indexOf("=");
    if (firstEquals !== -1) {
      const key = cleanLine.substring(0, firstEquals).trim();
      const val = cleanLine.substring(firstEquals + 1).trim();
      process.env[key] = val;
    }
  });
}

const smtpUser = process.env.GMAIL_SMTP_USER || "your_email@gmail.com";
const smtpPassword = process.env.GMAIL_SMTP_PASSWORD;

function testSMTPRaw(user, password) {
  return new Promise((resolve) => {
    console.log(`Connecting to smtp.gmail.com:465 using user: "${user}"...`);
    
    const socket = tls.connect({
      host: "smtp.gmail.com",
      port: 465,
      rejectUnauthorized: false
    });

    let step = 0;
    let finished = false;

    socket.on("data", (data) => {
      if (finished) return;
      const msg = data.toString();
      console.log("SMTP <-", msg.trim());

      if (msg.startsWith("220")) {
        console.log("SMTP -> EHLO localhost");
        socket.write("EHLO localhost\r\n");
      } else if (msg.startsWith("250")) {
        // After EHLO, send AUTH LOGIN
        if (step === 0) {
          console.log("SMTP -> AUTH LOGIN");
          socket.write("AUTH LOGIN\r\n");
          step = 1;
        }
      } else if (msg.startsWith("334")) {
        if (step === 1) {
          // Send base64 username
          const userBase64 = Buffer.from(user).toString("base64");
          console.log("SMTP -> [Base64 Username]");
          socket.write(userBase64 + "\r\n");
          step = 2;
        } else if (step === 2) {
          // Send base64 password
          const passBase64 = Buffer.from(password).toString("base64");
          console.log("SMTP -> [Base64 Password]");
          socket.write(passBase64 + "\r\n");
          step = 3;
        }
      } else if (msg.startsWith("235")) {
        console.log("✅ SUCCESS! SMTP authentication successful.");
        finished = true;
        socket.write("QUIT\r\n");
        resolve(true);
      } else if (msg.startsWith("535") || msg.startsWith("504") || msg.startsWith("501")) {
        console.log("❌ FAILED! Authentication rejected by Google.");
        finished = true;
        socket.write("QUIT\r\n");
        resolve(false);
      }
    });

    socket.on("error", (err) => {
      console.error("❌ Connection error:", err.message);
      resolve(false);
    });

    socket.on("end", () => {
      resolve(false);
    });

    // Timeout after 10 seconds
    setTimeout(() => {
      if (!finished) {
        console.log("❌ Connection timed out.");
        socket.destroy();
        resolve(false);
      }
    }, 10000);
  });
}

async function run() {
  if (!smtpPassword) {
    console.error("Error: Missing GMAIL_SMTP_PASSWORD in your .env file.");
    process.exit(1);
  }
  
  const success1 = await testSMTPRaw(smtpUser, smtpPassword);
  console.log("=========================================");
  if (!success1) {
    console.log("Authentication failed. Please verify credentials in your .env file.");
  }
}

run();
