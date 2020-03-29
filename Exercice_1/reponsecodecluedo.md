#Code Clue Do

Selon le code, on peut voir qu'il s'agit d'une application Web qui contient deux endpoints:

* **/**: enpoint root de la page. Il montre seulement un message de bienvenue.

* **/employee**: endpoint qui obtient le paramètre "cmd" et exécute une fonction en fonction de sa valeur (list ou add) et selon ce qu'il exécute, il aura besoin de paramètres supplémentaires.

On peut voir qu'il a une fonctionnalité principale, crypter les données. En utilisant le endpoint "employee" et en exécutant la fonction add, le nom d'un fichier et les données du fichier lui sont transmis. Le programme créera un nouveau fichier dont le contenu sera les données cryptées. La fonction de list permet de vérifier si le fichier existe ou non.

Dans ce petit programme, on a pu trouver certains défauts.

1. La clé de cryptage est écrite dans le fichier. Ce n'est pas sûr, il doit être caché (il peut être défini par exemple
 comme variable d'environnement dans un fichier .env)

2. La commande list exécute une commande bash pour vérifier si le fichier existe ou non. Le problème est qu'il ajoute le
 nom du fichier transmis par l'utilisateur sans le vérifier. Par conséquent, l'utilisateur pourrait exécuter d'autres 
 types de commandes bash en ajoutant ";". Par exemple, on peut envoyer ce qui suit en tant que paramètre ssn: 
 "filename; rm -r *". Ce faisant, le programme exécutera ls, puis essaiera de supprimer tous les fichiers du répertoire
 local. Comme le donné retourné est le output de la commande, l'attaquant peut effectuer une analyse de l'ordinateur 
 (peut utiliser pwd et se déplacer de l'adresse avec cd, etc.)

3. La bibliothèque md5 est obsolète et celle recommandée doit être utilisée. Md5 est également vulnérable (une collision de hash a été détectée)
