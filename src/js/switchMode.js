export const switchMode = () => {
  const bodyTheme = document.body;
  const modeSwitcher = document.querySelector('.mode');
  const [modeName, modeIcon] = modeSwitcher.children;
  modeSwitcher.addEventListener('click', () => {
    if (bodyTheme.dataset.theme === 'light') {
      bodyTheme.dataset.theme = 'dark';
      modeName.textContent = 'Light';
      modeIcon.classList.remove('mode__icon_moon');
      modeIcon.classList.add('mode__icon_sun');
    } else {
      bodyTheme.dataset.theme = 'light'
      modeName.textContent = 'Dark';
      modeIcon.classList.add('mode__icon_moon');
      modeIcon.classList.remove('mode__icon_sun');
    }
  })
}
