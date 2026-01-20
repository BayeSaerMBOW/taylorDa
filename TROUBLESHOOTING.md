# Guide de dépannage - Serveur qui s'arrête

Si le serveur Next.js s'arrête immédiatement après le démarrage, voici les étapes à suivre :

## 1. Vérifier le port 3000

```bash
lsof -i :3000
```

Si le port est déjà utilisé, tuez le processus ou changez le port :
```bash
PORT=3001 npm run dev
```

## 2. Nettoyer le cache

```bash
rm -rf .next
rm -rf node_modules/.cache
npm run dev
```

## 3. Vérifier les dépendances

```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## 4. Vérifier les erreurs de compilation

```bash
npx tsc --noEmit
```

## 5. Démarrer avec plus de mémoire

```bash
NODE_OPTIONS='--max-old-space-size=4096' npm run dev
```

## 6. Vérifier les logs détaillés

```bash
DEBUG=* npm run dev
```

## 7. Lancer manuellement et vérifier les erreurs

Dans un terminal séparé, lancez :
```bash
npm run dev
```

Et laissez-le tourner. Le serveur devrait afficher "✓ Ready" s'il fonctionne correctement.

## Problèmes connus

- Si vous voyez "✓ Starting..." mais pas "✓ Ready", il y a probablement une erreur de compilation non affichée
- Le serveur Next.js continue à tourner en arrière-plan. Pour l'arrêter, utilisez Ctrl+C
- Si le problème persiste, essayez de mettre à jour Next.js : `npm install next@latest`
