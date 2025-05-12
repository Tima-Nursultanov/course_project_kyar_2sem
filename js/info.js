document.getElementById('subscribe-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email-input').value.trim();

    if (email !== '') {
      document.getElementById('subscribe-form').style.display = 'none';
      document.getElementById('success-message').style.display = 'block';

      setTimeout(() => {
        document.getElementById('newsletter-subscription-section').style.display = 'none';
      }, 3000);
    } else {
      alert('Пожалуйста, введите email.');
    }
  });