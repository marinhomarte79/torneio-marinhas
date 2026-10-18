# Torneio FC Marinhas – site com edição online

## Estrutura
- `public/index.html` – o site (azul e branco)
- `netlify/functions/data.mjs` – guarda e lê os dados (Netlify Blobs)
- `netlify.toml` e `package.json` – configuração

## Publicar (via GitHub – o mais simples)
1. Crie um repositório no GitHub e envie todos estes ficheiros.
2. No Netlify: **Add new site → Import an existing project** → escolha o repositório → **Deploy**.
3. No Netlify: **Site configuration → Environment variables → Add a variable**
   - Chave: `ADMIN_PASSWORD`
   - Valor: a palavra-passe que quiser
4. **Deploys → Trigger deploy → Deploy site** (necessário para a variável ficar ativa).

## Usar
- Abra o site, clique em **🔒 Admin**, escreva a palavra-passe.
- Altere resultados/horários/equipas e clique em **Guardar e publicar**.
- O site de todos os visitantes atualiza sozinho em cerca de 30 segundos.

## Alternativa sem GitHub (Netlify CLI)
```
npm install
npx netlify login
npx netlify init      # ligar/criar o site
npx netlify env:set ADMIN_PASSWORD "a-sua-palavra-passe"
npx netlify deploy --prod
```
Nota: arrastar a pasta para o Netlify (drag and drop) NÃO instala as dependências da função; use GitHub ou CLI.

## Testar localmente
```
npm install
ADMIN_PASSWORD=teste npx netlify dev
```
