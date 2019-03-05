<template>
  <div id="app">
    <div class="header">
      <img class="logo" src="assets/logo.png"/>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">

:root {
  --color-Elementares_Gestalten: #E4E4E3;
  --color-Atelier: #E4E4E3;
  --color-Interfacedesign: #D1EBEB;
  --color-Kommunikationsdesign: #EAF2CF;
  --color-Produktdesign: #C9E1AD;
  --color-Theorie: #E4E4E3;
  --color-Werkstatt: #E4E4E3;
  --color-Projekte: #E4E4E3;


  --transition-default: 180ms ease-in;
}
  
#app {
  font-family: 'FHPSun-Regular';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0 8rem;
  margin-bottom: 2.5rem;
}

.header{
  .logo {
    margin-top: 2.5rem;
    max-height: 5rem;
  }
}




.select {
  align-self: flex-end;
  &:before {
      content: '';
      display: inline-block;
      width: 10px;
      height: 10px;
      margin-right: .5rem;
      background-image: url('/assets/icons/down-arrow.svg'); 
  }
  select {
    appearance: none;
    border:none;
    border-radius: 0;
    font-size: 1em;
    background: none;
    font-family: 'FHPSun-Regular';
    font-size: 1rem;
  }
}
  
</style>
