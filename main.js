const { createApp } = Vue;

createApp({
  data() {
    return {
      form: { nome: '', turma: '' },
      inscritos: [],
      darkMode: false,
      modalOpen: false,
      modal: { title: '', desc: '' }
    };
  },
  methods: {
    adicionarInscrito() {
      if (!this.form.nome.trim() || !this.form.turma.trim()) return;

      // Adiciona a inscrição normalmente
      this.inscritos.push({ nome: this.form.nome.trim(), turma: this.form.turma.trim() });
      this.form.nome = '';
      this.form.turma = '';

      // 🔊 Reproduz som de sucesso
      const audio = document.getElementById('success-audio');
      if (audio) {
        audio.currentTime = 0;
        audio.play();
      }

      // 🎉 Dispara o efeito de confete (Canvas Confetti)
      const duration = 2 * 1000;
      const end = Date.now() + duration;

      const colors = ['#0072ff', '#00c6ff', '#ffcc00', '#ff7ab6'];

      (function frame() {
        confetti({
          particleCount: 6,
          angle: 60,
          spread: 75,
          origin: { x: 0 },
          colors: colors,
        });
        confetti({
          particleCount: 6,
          angle: 120,
          spread: 75,
          origin: { x: 1 },
          colors: colors,
        });
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }, // ← vírgula adicionada aqui ✅

    removerInscrito(index) {
      this.inscritos.splice(index, 1);
    },

    // 🌙 Alternar entre claro/escuro
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
      document.documentElement.classList.toggle('dark', this.darkMode);
    },

    // 🎉 Função de confete (também pode ser chamada em outros eventos)
    showConfetti() {
      const duration = 2 * 1000; // 2 segundos
      const end = Date.now() + duration;

      const colors = ['#ffcc00', '#ff9900', '#ff4d4d', '#00c6ff', '#ff7ab6'];

      (function frame() {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 75,
          origin: { x: 0 },
          colors: colors,
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 75,
          origin: { x: 1 },
          colors: colors,
        });
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    },

    // Modal simples (opcional, se quiser mostrar mensagens ou imagens)
    openModal(title, desc) {
      this.modal = { title, desc };
      this.modalOpen = true;
    },
    closeModal() {
      this.modalOpen = false;
    }
  }
}).mount('#app');
