<template>
  <div id="app">
    <router-view/>
  </div>
</template>


<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
  

  .modal-open {
    overflow: hidden;
  }
}

.input {
  font-size: 1rem;
  border: 1px solid #DBDBDB;
  border-radius: 4px;
  margin: 0 .25rem;
  &__small {
    font-size: .85rem;
    padding: .25rem .5rem;
  }
  &__medium {
    font-size: 1rem;
    padding: .5rem .5rem;
  }
  &__large {
    font-size: 1.1rem;
    padding: 1rem .5rem;
  }
}

.button {
    cursor: pointer;
    padding: 0 .5rem;
    min-width: 100px;
    border: 0;
    background:  #fff;
    border: 1px solid #DBDBDB;
    border-radius: 4px;
    margin: 0 .25rem;
    &:hover {
      background: #F8F8F8;
    }
    &__small {
      padding: .25rem 2rem;
    }
    &__medium {
      padding: .5rem 2rem;
      &--cta {
        // background: #fff;
        // color: #3475E0;

        background: #3475E0;
        color: #fff;
        border: 1px solid #3475E0;
        &:hover {
          background: #3475E0;
        }
      }
    }
    &__large {
      padding: 1rem 2rem;
    }
  }
</style>
