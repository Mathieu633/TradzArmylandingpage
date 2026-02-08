# Ajouter ton domaine Resend (mathieub.com) avec Netlify DNS

Si ton domaine est géré par Netlify (Netlify Domains ou DNS), voici comment ajouter les enregistrements pour Resend.

## Étape 1 : Ouvrir Netlify DNS

1. Va sur [app.netlify.com](https://app.netlify.com)
2. **Domain management** (ou **Domains**) dans le menu
3. Clique sur **mathieub.com**
4. Descends jusqu’à **DNS records** (Enregistrements DNS)
5. Clique sur **Add new record** (Ajouter un enregistrement)

---

## Étape 2 : Ajouter les enregistrements Resend

**Depuis la page Resend** (Domaine → mathieub.com), note les valeurs affichées puis crée les enregistrements suivants dans Netlify.

⚠️ **Important** : Dans Netlify, choisis **TXT** (et non "SMS"). Resend affiche parfois "SMS" mais c’est toujours un enregistrement **TXT**.

### 1. DKIM (Vérification de domaine)

- **Type** : **TXT** (pas SMS)  
- **Name** : `resend._domainkey`  
- **Value** : colle la valeur complète depuis Resend (commence par `p=MIG...`)  
- **TTL** : Auto (ou 3600)  
- Clique **Save**

### 2. MX (Activer l’envoi)

- **Type** : MX  
- **Name** : `send`  
- **Value** : l’adresse fournie par Resend (ex. `feedback-smtp.eu-west-1.amazonses.com`)  
- **Priority** : `10`  
- **TTL** : Auto  
- Clique **Save**

### 3. SPF (Activer l’envoi)

- **Type** : TXT  
- **Name** : `send`  
- **Value** : colle la valeur SPF depuis Resend (commence par `v=spf1...`)  
- **TTL** : Auto  
- Clique **Save**

### 4. DMARC (optionnel)

- **Type** : **TXT** (pas SMS)  
- **Name** : `_dmarc`  
- **Value** : `v=DMARC1; p=none;` (ou ce que Resend indique)  
- **TTL** : Auto  
- Clique **Save**

---

## Étape 3 : Valider dans Resend

1. Attends 5 à 30 minutes (propagation DNS)
2. Dans Resend, clique sur **« J'ai ajouté les enregistrements »**
3. Resend vérifie les enregistrements. Si tout est correct, le domaine sera marqué comme vérifié.

---

## Notes Netlify

- **Type** : choisis toujours **TXT** pour DKIM, SPF et DMARC (ignore "SMS" si tu le vois).
- **Name** : pour `resend._domainkey`, utilise exactement `resend._domainkey`
- **Name** : pour `send`, utilise `send` (sous-domaine `send.mathieub.com`)
- **Name** : pour `_dmarc`, utilise `_dmarc`
- Ne modifie pas les enregistrements existants pour le site (A, CNAME, etc.).  
  Ces nouveaux enregistrements coexistent avec eux.

---

## Dépannage

### Erreur 422 Unprocessable Content (rien ne s’ajoute au clic sur Save)

L’erreur **422** signifie que l’API Netlify refuse la requête car les données envoyées sont invalides. Voici les causes les plus probables :

#### 1. Tu n’es pas sur la bonne page
- **À faire** : Netlify → **Domain management** (menu de gauche) → **mathieub.com** → section **DNS records**
- **À éviter** : Les paramètres de domaine d’un site (Site → Domain management → Configuration du domaine). Depuis là, l’ajout d’enregistrements peut échouer. Utilise bien la section **Domains** du compte/équipe.

#### 2. Le domaine n’utilise pas Netlify DNS
Si mathieub.com pointe vers des nameservers externes (ex. GoDaddy, Cloudflare), la zone DNS Netlify peut être inactive ou en lecture seule.

- **Vérifier** : Dans Domain management → mathieub.com, regarde les **Serveurs de noms** (nameservers).  
  Ils doivent être de type Netlify (ex. `dns1.p03.nsone.net`, `dns2.p03.nsone.net`).
- **Si c’est externe** : Soit tu délègues le domaine à Netlify DNS (changer les nameservers chez ton registrar), soit tu ajoutes les enregistrements Resend chez ton fournisseur DNS actuel (par ex. Cloudflare).

#### 3. Format du champ Name/Hostname
Netlify peut être strict sur le format. Essaie ces variantes :

| Enregistrement | Essaie d’abord | Si ça échoue, essaie |
|----------------|----------------|----------------------|
| DKIM           | `resend._domainkey` | `resend._domainkey.mathieub.com` |
| MX / SPF (send)| `send`              | `send.mathieub.com`   |
| DMARC          | `_dmarc`             | `@` ou laisser vide   |

#### 4. Zone DNS inactive
- Aller sur : [app.netlify.com](https://app.netlify.com) → **Domain management** → **mathieub.com**
- Vérifier que la zone est bien active et que tu peux voir les enregistrements existants (A, CNAME, etc.)
- Si la zone indique qu’elle est externe ou non managée, tu dois configurer le DNS chez le fournisseur réel.

#### 5. Solution de contournement : Cloudflare DNS
Si Netlify continue de refuser (422) :

1. Crée un compte [Cloudflare](https://cloudflare.com) (gratuit)
2. Ajoute le domaine **mathieub.com**
3. Cloudflare te donnera de nouveaux nameservers (ex. `ada.ns.cloudflare.com`, `bob.ns.cloudflare.com`)
4. Chez Netlify (ou ton registrar) : remplace les nameservers par ceux de Cloudflare
5. Dans Cloudflare → DNS → Records : ajoute tous les enregistrements Resend (DKIM, MX, SPF, DMARC)

Cette approche contourne l’erreur 422 de Netlify tout en gardant le site hébergé sur Netlify.

---

### Les enregistrements ne s'ajoutent pas au clic sur Save (sans erreur 422)

1. **Vérifie que tu es au bon endroit** : Netlify → **Domain management** (menu gauche) → **mathieub.com** → section **DNS records**. Pas les paramètres de domaine d'un site.

2. **Format du champ Nom** : essaie avec `@` pour les enregistrements à la racine (ex. `_dmarc`) si `_dmarc` ne fonctionne pas.

3. **Enregistrement DKIM trop long** : la clé DKIM peut dépasser 255 caractères. Colle exactement la valeur de Resend ; Netlify gère normalement le découpage.

4. **Rafraîchir la page** : après Save, rafraîchis (F5) pour voir si l'enregistrement apparaît.

5. **Essayer dans une autre fenêtre** : mode navigation privée ou autre navigateur.

6. **Alternative : Cloudflare DNS** : si Netlify bloque, tu peux utiliser Cloudflare (gratuit) pour le DNS : ajoute le domaine sur Cloudflare, change les nameservers chez Netlify, puis ajoute les enregistrements Resend dans Cloudflare.

---

### Domaine non vérifié

- **Domaine non vérifié** : vérifie que les valeurs sont identiques à celles de Resend (espaces, majuscules).
- **Propagation** : la propagation peut prendre jusqu’à 24–48 h.
- **Plusieurs TXT** : si un enregistrement TXT existe déjà pour le même nom, combine les valeurs ou crée un nouvel enregistrement selon les instructions de Resend.
