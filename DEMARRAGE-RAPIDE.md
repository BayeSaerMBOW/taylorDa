# 🚀 Guide de démarrage rapide

## Pour démarrer le serveur :

1. **Ouvrez un terminal** dans le dossier du projet :
```bash
cd /home/baye_saer_mbow/Documents/taylor
```

2. **Lancez le serveur** :
```bash
npm run dev
```

3. **ATTENDEZ 30-40 SECONDES** ⏱️

   Vous verrez :
   ```
   ✓ Starting...
   ```
   
   **Laissez le terminal ouvert et attendez !** Le serveur compile en arrière-plan.
   
   Après 30-40 secondes, vous verrez :
   ```
   ✓ Ready in Xs
   ○ Compiling / ...
   ```

4. **Ouvrez votre navigateur** et allez sur :
   ```
   http://localhost:3000
   ```

## ⚠️ Important

- **Ne fermez PAS le terminal** où `npm run dev` tourne
- Le serveur doit continuer à fonctionner en arrière-plan
- La première compilation prend 30-40 secondes
- Les compilations suivantes seront plus rapides (2-5 secondes)

## ✅ Vérifier que le serveur fonctionne

Dans un **nouveau terminal**, testez :
```bash
curl http://localhost:3000
```

Si vous obtenez du HTML, le serveur fonctionne !

## 🛑 Pour arrêter le serveur

Dans le terminal où `npm run dev` tourne, appuyez sur :
```
Ctrl + C
```
