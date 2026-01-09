<template>
  <nav>
    <ul>
      <li>    
        <RouterLink to="/register">Go to Register</RouterLink>
      </li>
      <li>  
        <RouterLink to="/login">Go to Login</RouterLink>
      </li>
    </ul>
  </nav>

  <RouterView></RouterView>
</template>


<style>
nav {
  padding: 10px;
  text-align: center;
  background-color: rgb(222, 186, 255);
  font-family: sans-serif;
}

ul{
  list-style: none;
  display: flex;
  padding: 0;
  width: 100%;
}

li{
  flex: 1;
  text-align: center;
}
</style>