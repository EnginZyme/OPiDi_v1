<template>
  <div id="app">
    <router-view />
    <Toast />
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat");
#app {
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-user-select: none; /* Chrome all / Safari all */
  -moz-user-select: none; /* Firefox all */
  -ms-user-select: none; /* IE 10+ */
  user-select: none;
  background-color: #efefff;
  display: grid;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
