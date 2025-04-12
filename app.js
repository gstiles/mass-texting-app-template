function normalizePhoneNumber(input) {
  const digits = input.replace(/\D/g, '');
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
  return null;
}

async function sendSMS() {
  const rawInput = document.getElementById("phoneNumbers").value;
  const message = document.getElementById("message").value;
  const status = document.getElementById("status");

  if (!rawInput || !message) {
    status.textContent = "Please enter phone numbers and a message.";
    return;
  }

  const phoneNumbers = rawInput
    .split("\n")
    .map(line => normalizePhoneNumber(line.trim()))
    .filter(number => number !== null);

  if (phoneNumbers.length === 0) {
    status.textContent = "No valid phone numbers entered.";
    return;
  }

  try {
    const response = await fetch("/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phoneNumbers, message })
    });

    if (response.ok) {
      status.textContent = "Messages sent successfully!";
    } else {
      status.textContent = "Failed to send messages.";
    }
  } catch (error) {
    console.error("Error sending SMS:", error);
    status.textContent = "Error sending messages.";
  }
}
