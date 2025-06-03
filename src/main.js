import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

const fetchArticles = async () => {
  try {
    const response = await fetch(
      'https://cfqeeruznpbdxzapmcgv.supabase.co/rest/v1/article', {
      headers: {
        apiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcWVlcnV6bnBiZHh6YXBtY2d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NTQ3NzcsImV4cCI6MjA2MzIzMDc3N30.CQK7IP2HkEqEy2rsC7EC6LMOraH3o_hmXm1mzMqvfzg',
      },
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

let data = [];

const init = async () => {
  data = await fetchArticles();
  test();
};

init();
console.log(data);

const createNewArticle = async (title, subtitle, author, content, created_at) => {
 try {
 const response = await fetch('https://cfqeeruznpbdxzapmcgv.supabase.co/rest/v1/article', {
 method: 'POST',
 headers: {
 apiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcWVlcnV6bnBiZHh6YXBtY2d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NTQ3NzcsImV4cCI6MjA2MzIzMDc3N30.CQK7IP2HkEqEy2rsC7EC6LMOraH3o_hmXm1mzMqvfzg',
 'Content-Type' : 'application/json' ,
 },
 body: JSON.stringify({ title, subtitle, author, content, created_at }),
 });

 if (response.status !== 201) {
 throw new Error(`Status: ${response.status}`);
 }
 } catch (error) {
 console.error('Fetch error:' , error);
 }
};

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1 class="text-2xl font-bold text-primary">Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button" class="bg-blue-300 p-4"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`
function test(){
  document.querySelector('#article').innerHTML = "";
for (let article of data){
  console.log(article);
document.querySelector('#article').innerHTML += `<div> tytuł: ${article.title} podtytuł: ${article.subtitle} nazwa autora: ${article.author} data: ${article.created_at} treść: ${article.content} </div> <hr>
`
}
}

test();

document.getElementById('form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const subtitle = document.getElementById('subtitle').value;
    const author = document.querySelector('#author').value;
    const content = document.getElementById('content').value;
    const created_at = document.getElementById('data').value;
  
    console.log(title, subtitle, author, content, created_at);
    await createNewArticle(title, subtitle, author, content, created_at); 
    data = await fetchArticles(); 
    test(); 
})


setupCounter(document.querySelector('#counter'))
