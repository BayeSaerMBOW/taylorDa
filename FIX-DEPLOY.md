# Correction de l'erreur "Failed to create model" en production

## Problème identifié

L'erreur "Failed to create model" en production peut avoir plusieurs causes :

### 1. **Système de fichiers en lecture seule**
- Certaines plateformes (Vercel, Netlify) utilisent un système de fichiers temporaire
- Les fichiers JSON peuvent ne pas persister entre les redéploiements
- Solution : Utiliser une base de données (recommandé pour la production)

### 2. **Permissions insuffisantes**
- Le dossier `data/` peut ne pas être accessible en écriture
- Solution : Vérifier les logs serveur pour voir les erreurs exactes

## Corrections apportées

### 1. Amélioration de la gestion des erreurs
- ✅ Logs détaillés dans `lib/data.ts`
- ✅ Messages d'erreur plus explicites dans l'API
- ✅ Vérification des permissions d'écriture

### 2. Vérifications ajoutées
- ✅ Vérification que le dossier `data/` existe
- ✅ Vérification des permissions d'écriture
- ✅ Logs de chaque étape d'initialisation

## Solutions recommandées pour la production

### Option 1 : Utiliser une base de données (RECOMMANDÉ)

Pour la production, utilisez une vraie base de données :

**Avec Vercel + Vercel Postgres :**
```bash
# Installer @vercel/postgres
npm install @vercel/postgres
```

**Avec Railway, Supabase, ou PlanetScale :**
```bash
# Utiliser Prisma ou un ORM similaire
npm install @prisma/client prisma
```

### Option 2 : Utiliser un service de stockage

**Avec Vercel KV (Redis) :**
```bash
npm install @vercel/kv
```

**Avec Upstash :**
```bash
npm install @upstash/redis
```

## Debug en production

Les logs sont maintenant améliorés. Pour voir l'erreur exacte :

1. Vérifiez les logs de votre plateforme de déploiement
2. Les erreurs détaillées seront loggées dans la console
3. Les messages d'erreur incluent maintenant plus de détails

## Solution temporaire

Si vous devez utiliser le système de fichiers JSON en production :

1. Assurez-vous que le dossier `data/` existe
2. Vérifiez les permissions d'écriture
3. Sur Vercel, utilisez `/tmp` au lieu de `data/` :

```typescript
function getDataDir() {
  // En production, utiliser /tmp qui est accessible en écriture
  if (process.env.VERCEL) {
    return '/tmp/data'
  }
  return path.join(process.cwd(), 'data')
}
```

## Prochaines étapes

1. **Immédiat** : Vérifiez les logs serveur pour voir l'erreur exacte
2. **Court terme** : Utilisez `/tmp` pour les fichiers en production
3. **Long terme** : Migrer vers une vraie base de données
