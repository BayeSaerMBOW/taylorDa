#!/bin/bash
cd "$(dirname "$0")"

echo "Nettoyage du cache..."
rm -rf .next

echo "Démarrage du serveur..."
NODE_OPTIONS='--max-old-space-size=4096' npm run dev 2>&1 | while IFS= read -r line; do
    echo "$line"
    if [[ "$line" == *"Ready"* ]]; then
        echo ""
        echo "✓✓✓ Le serveur est prêt !"
        echo "Accédez à: http://localhost:3000"
        echo ""
    fi
done
