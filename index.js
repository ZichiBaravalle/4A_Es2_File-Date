window.onload = () => {
  const input = document.querySelector("input");
  input.addEventListener("change", (evento) => {
    const file = evento.target.files[0];
    const reader = new FileReader();
    reader.onload = (file) => {
      const array = JSON.parse(file.target.result);
      const min = minData(array[0]);
      const tBody = document.querySelector("tbody");
      for (const tr of tBody.children) {
        const data = new Date(min)
        const lezioni = array.filter((lezione) => {
            const oraInizioLezione = tr.children[0].innerText
            if (lezione.inizio.includes(oraInizioLezione.substring(0, oraInizioLezione.indexOf(" ")))) return true
            else return false
        })
        for (const td of tr.children) {
          if (td.id === "ora") continue;
        
            for (const lezione of lezioni) {
                const dataLezione = new Date(lezione.inizio)

                if (dataLezione.getDate() === data.getDate()) 
                    td.innerText = lezione.materia
            }

            if (td.id !== "ora") data.setDate(data.getDate() + 1);
        }
      }
    };
    reader.readAsText(file);
  });
};

const minData = (lezione) => {
  const data = new Date(lezione.inizio);
  return new Date(data.setDate(data.getDate() - (data.getDay() - 1)));
};