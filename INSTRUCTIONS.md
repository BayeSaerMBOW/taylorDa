# Instructions pour démarrer le serveur

## Problème : Le serveur s'arrête après "✓ Starting..."

Si vous voyez que le serveur affiche "✓ Starting..." puis retourne à l'invite de commande, **laissez-le tourner dans le terminal**. 

### Solution :

1. **Lancez le serveur dans un terminal** :
```bash
cd /home/baye_saer_mbow/Documents/taylor
npm run dev
```

2. **Ne fermez PAS le terminal** - Laissez la commande en cours d'exécution

3. **Attendez 30-60 secondes** même si vous voyez le prompt. Le serveur peut être en train de compiler en arrière-plan

4. **Dans un autre terminal ou navigateur**, essayez d'accéder à :
   - http://localhost:3000

### Vérifier si le serveur fonctionne :

Ouvrez un **nouveau terminal** et testez :
```bash
curl http://localhost:3000
```

Si vous obtenez du HTML, le serveur fonctionne !

### Si ça ne fonctionne toujours pas :

1. Vérifiez que le port 3000 est libre :
```bash
lsof -i :3000
```

2. Essayez un autre port :
```bash
PORT=3001 npm run dev
```

3. Nettoyez et réinstallez :
```bash
rm -rf .next node_modules package-lock.json
npm install
npm run dev
```

### Le serveur Next.js fonctionne différemment

- Le serveur **continue à tourner** même si le prompt réapparaît
- C'est normal que vous ne voyiez pas "✓ Ready" immédiatement
- Le serveur peut compiler les pages à la demande

**Important** : Ne fermez PAS le terminal où `npm run dev` est en cours !
