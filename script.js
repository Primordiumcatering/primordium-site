document.addEventListener("DOMContentLoaded", () => {
  const sections = {
    projet: `---SECTION LE PROJET A INSÉRER ICI---`,
    offre: `---SECTION OFFRE A INSÉRER ICI---`,
    engagements: `---SECTION ENGAGEMENTS A INSÉRER ICI---`,
    contact: `---SECTION CONTACT A INSÉRER ICI---`
  };

  for (const [id, html] of Object.entries(sections)) {
    document.getElementById(id).innerHTML = html;
  }
});