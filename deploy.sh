#!/bin/bash
ng build --configuration production && \
sudo cp -r dist/cocolab/browser/* /var/www/cocolab/
echo "Déploiement terminé !"