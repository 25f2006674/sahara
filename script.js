// mobile menu: show or hide the menu, and close it after a link is clicked
const nav = document.getElementById("nav");
document.getElementById("menuBtn").onclick = () => nav.classList.toggle("open");
nav.onclick = () => nav.classList.remove("open");

// gallery: click a photo to enlarge it, click anywhere on the popup to close it
const modal = document.getElementById("modal");
document.querySelectorAll(".shot").forEach((shot) => {
  shot.onclick = () => {
    document.getElementById("modalImg").style.backgroundImage = shot.style.backgroundImage;
    modal.hidden = false;
  };
});
modal.onclick = () => (modal.hidden = true);

// contact form: check the fields, then send them to Formspree (paste your own form link below)
const form = document.getElementById("contactForm");
const statusBox = document.getElementById("formStatus");

form.onsubmit = async (e) => {
  e.preventDefault(); // stop the page from reloading

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (name == "" || message == "" || !/^\S+@\S+\.\S+$/.test(email)) {
    statusBox.textContent = "Please fill in your name, a valid email and a message.";
    statusBox.className = "status fail";
    return;
  }

  try {
    const res = await fetch("https://formsubmit.co/ajax/connectwithsahara@study.iitm.ac.in", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(form),
    });
    if (!res.ok) throw new Error();
    form.reset();
    statusBox.textContent = "Thank you! Your message has been sent.";
    statusBox.className = "status ok";
  } catch {
    statusBox.textContent = "Sorry, something went wrong. Please try again.";
    statusBox.className = "status fail";
  }
};