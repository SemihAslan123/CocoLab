import { Component } from '@angular/core';
import { NgIf, NgFor, CommonModule } from '@angular/common'; // Importez CommonModule pour NgIf et NgFor

// Définissez une interface pour la structure des données de service
interface ServiceInfo {
  name: string;
  description: string;
  details: string[]; // Liste de points clés/détails
}

@Component({
  selector: 'app-services',
  // Ajoutez NgIf et NgFor dans les imports pour les utiliser dans le template
  imports: [CommonModule],
  standalone: true, // Ajoutez standalone si ce n'est pas déjà fait
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {
  // État de la modale
  isModalOpen: boolean = false;
  // Service actuellement sélectionné (peut être null si la modale est fermée)
  selectedService: ServiceInfo | null = null;

  // Données des services avec des détails pour la modale
  servicesData: ServiceInfo[] = [
    {
      name: 'Sites web & apps',
      description: 'Sites vitrines, e-commerce, applications web performantes et optimisées. Nous construisons la vitrine numérique de votre succès.',
      details: [
        'Développement Front-end et Full Stack sur Mesure : Des interfaces utilisateurs modernes, fluides et engageantes en choisissant la technologie la plus adaptée à votre besoin (Angular, React, Vue.js, etc.).',
        'Solutions E-commerce Sur Mesure : Des plateformes robustes pour maximiser vos ventes en ligne.',
        'Optimisation SEO & Vitesse : Code propre pour un meilleur classement Google et des temps de chargement éclair, essentiels pour la rétention client.',
        'Design Responsive (Mobile-First) : Votre site est impeccable et fonctionnel sur tous les appareils, du smartphone au grand écran.'
      ]
    },
    {
      name: 'Intelligence Artificielle',
      description: 'Implémentation de solutions d’IA pour la productivité et l\'analyse. Transformez vos données en avantage concurrentiel immédiat.',
      details: [
        'Chatbots et Assistants Virtuels (LLMs) : Améliorez le support client 24/7 et automatisez les requêtes répétitives.',
        'Modèles de Prédiction et Analyse : Anticipez les tendances du marché, les besoins des utilisateurs ou les risques opérationnels.',
        'Automatisation Intelligente des Tâches : Libérez vos équipes des processus manuels fastidieux grâce à des systèmes autonomes.',
        'Analyse Avancée des Données : Des tableaux de bord clairs pour prendre des décisions stratégiques basées sur des faits, pas des suppositions.'
      ]
    },
    {
      name: 'Applications mobiles',
      description: 'Réalisation d\'applications pour iOS et Android, natives ou hybrides. Nous portons votre marque directement dans la poche de vos clients.',
      details: [
        'Expérience Utilisateur Native et Fluide : Développement pour une performance irréprochable.',
        'Intégration Complète des Fonctionnalités : Utilisation du GPS, de la caméra, des notifications push et des capteurs pour une application enrichie.',
        'Monétisation et Services In-App : Mise en place sécurisée des abonnements, paiements et achats intégrés.',
        'Gestion de la Publication et des Mises à Jour : Prise en charge de la soumission aux App Stores (Apple et Google Play) et du suivi post-lancement.'
      ]
    },
    {
      name: 'API & backends',
      description: 'Conception et développement d\'architectures backend robustes et sécurisées. La fondation solide et scalable de votre croissance numérique.',
      details: [
        'API RESTful et GraphQL Performantes : Des ponts de communication rapides et sécurisés pour vos applications et services tiers.',
        'Sécurité et Conformité des Données : Mise en place des meilleures pratiques (Authentification, cryptage, RGPD) pour protéger vos utilisateurs.',
        'Architecture Cloud Optimisée (AWS, Azure, GCP) : Des solutions d\'hébergement élastiques qui s\'adaptent à votre trafic, sans surcoût inutile.',
        'Base de Données Optimale : Choix et configuration des systèmes pour garantir la rapidité et l\'intégrité de vos données critiques.'
      ]
    },
    {
      name: 'Automatisation & No-code',
      description: 'Gagnez en efficacité avec des workflows automatisés. Optimisez vos opérations sans écrire une seule ligne de code complexe.',
      details: [
        'Audit et Modélisation de Processus : Identification des tâches répétitives à forte valeur ajoutée qui peuvent et doivent être automatisées.',
        'Intégration d\'Outils Low-code/No-code : Utilisation experte de plateformes comme Zapier, Make (Integromat) ou Bubble pour des workflows rapides.',
        'Connexion Transparente des Systèmes : Création de ponts entre vos outils CRM, E-mail, facturation et outils internes pour une synchronisation parfaite.',
        'Réduction des Erreurs Manuelles : Automatisez la saisie de données et la validation pour garantir la fiabilité de vos informations.'
      ]
    },
    {
      name: 'Design UX/UI',
      description: 'Des interfaces intuitives et esthétiques qui séduisent et convertissent. Nous concevons pour vos utilisateurs, pour vos résultats.',
      details: [
        'Recherche Utilisateur (UX Research) : Comprendre les besoins, les douleurs et les parcours de vos utilisateurs pour concevoir des solutions pertinentes.',
        'Prototypage et Tests Utilisateurs : Des maquettes interactives (Figma) et validation des flux avant le développement, garantissant l\'efficacité.',
        'Design System Robuste : Un ensemble de composants et de règles qui assure la cohérence de votre marque sur toutes les plateformes.',
        'Accessibilité et Standards Modernes : Conception qui respecte les normes d\'accessibilité (WCAG) pour un produit inclusif et professionnel.'
      ]
    }
  ];

  // Méthode appelée lors du clic sur le bouton "Plus d'infos"
  openModal(serviceName: string): void {
    const service = this.servicesData.find(s => s.name === serviceName);
    if (service) {
      this.selectedService = service;
      this.isModalOpen = true;
      // Pour empêcher le défilement de l'arrière-plan
      document.body.style.overflow = 'hidden';
    }
  }

  // Méthode pour fermer la modale
  closeModal(): void {
    this.isModalOpen = false;
    this.selectedService = null;
    // Rétablir le défilement
    document.body.style.overflow = 'auto';
  }
}
