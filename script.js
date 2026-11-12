document.addEventListener('DOMContentLoaded', () => {
    // 1. Interatividade de virar os Flashcards
    const flashcards = document.querySelectorAll('.flashcard');
    flashcards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });

    // 2. Barra de progresso de leitura & Botão Voltar ao Topo
    const progressBar = document.getElementById('progressBar');
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';

        if (scrollTop > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 3. Animação de aparição suave das seções (Scroll Reveal)
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        reveals.forEach(section => {
            const top = section.getBoundingClientRect().top;
            if (top < window.innerHeight - 80) {
                section.classList.add('visible');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // 4. Simulador Interativo de Cena de Crime
    const evidenceData = {
        1: {
            code: "LAUDO PRELIMINAR • #01",
            title: "Impressão Digital Latente em Superfície Lisa",
            desc: "Vestígio invisível a olho nu revelado através da aplicação de pó magnético e luz forense (ALS). Após fotografia em escala métrica, os pontos característicos (minúcias) são confrontados no sistema AFIS para identificação imediata.",
            area: "Papiloscopia Forense",
            equip: "Luz Forense & Pó Revelador"
        },
        2: {
            code: "LAUDO PRELIMINAR • #02",
            title: "Estojo de Munição Deflagrado (Calibre 9mm)",
            desc: "Coletado com pinça emborrachada para não gerar novas ranhuras. No laboratório, o microcomparador balístico analisa as marcas únicas deixadas pelo percutor e extrator da arma de fogo, vinculando o estojo ao armamento.",
            area: "Balística Forense",
            equip: "Microcomparador Balístico"
        },
        3: {
            code: "LAUDO PRELIMINAR • #03",
            title: "Smartphone Bloqueado Encontrado no Local",
            desc: "Acondicionado imediatamente em bolsa bloqueadora de sinal (Gaiola de Faraday) para impedir apagamento remoto. No laboratório de informática forense, realiza-se a extração física e recuperação de mensagens apagadas.",
            area: "Computação Forense",
            equip: "Bloqueador RF & Extrator Forense"
        },
        4: {
            code: "LAUDO PRELIMINAR • #04",
            title: "Microvestígio Biológico em Tecido",
            desc: "Amostra coletada com swab estéril após detecção por luz ultravioleta. Encaminhada ao laboratório de genética forense para extração, amplificação (PCR) e comparação de perfil de DNA no Banco Nacional.",
            area: "Genética & Biologia Forense",
            equip: "Swab Estéril & Sequenciador de DNA"
        }
    };

    const markerBtns = document.querySelectorAll('.marker-btn');
    const reportContainer = document.getElementById('evidenceReport');

    markerBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            markerBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const id = btn.getAttribute('data-evidence');
            const data = evidenceData[id];

            reportContainer.innerHTML = `
                <div class="report-header">
                    <span class="report-code">${data.code}</span>
                    <span class="report-status">EM ANÁLISE</span>
                </div>
                <h3>${data.title}</h3>
                <p>${data.desc}</p>
                <div class="report-meta">
                    <span><strong>Área:</strong> ${data.area}</span>
                    <span><strong>Equipamento:</strong> ${data.equip}</span>
                </div>
            `;
        });
    });

    // 5. Desafio Interativo (Modo Investigação)
    const optionBtns = document.querySelectorAll('.option-btn');
    const feedbackBox = document.getElementById('caseFeedback');

    optionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            optionBtns.forEach(b => b.classList.remove('correct', 'wrong'));
            const isCorrect = btn.getAttribute('data-correct') === 'true';

            if (isCorrect) {
                btn.classList.add('correct');
                feedbackBox.style.color = '#66bb6a';
                feedbackBox.innerHTML = '✅ <strong>Excelente decisão técnica!</strong> Isolar o local preserva a Cadeia de Custódia, manter o computador ligado evita a perda de dados voláteis na memória RAM e segurar o copo pela base preserva possíveis impressões digitais latentes.';
            } else {
                btn.classList.add('wrong');
                feedbackBox.style.color = '#ff5252';
                feedbackBox.innerHTML = '❌ <strong>Atenção! Risco de contaminação de prova.</strong> Tocar em objetos sem luvas destrói impressões digitais e desligar o computador apaga evidências temporárias da memória RAM.';
            }
        });
    });
});