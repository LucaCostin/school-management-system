# school-management-system

Aplicatia a fost creata cu MERN Stack (MongoDB, ExpressJs, ReactJs, NodeJs).

Scopul aplicatiei este de a administra baza de date a unui liceu. Doar un administrator poate crea utilizatori. 

Administratorul poate crea, edita si sterge utilizatori, poate crea clase. Profesorii vor putea introduce notele elevilor, iar elevii sa citeasca notele. Acestea din urma nu au fost implementate inca.

Am ales sa creez eu securitatea autentificarii prin pasarea rolului in header-ul requestului, iar intr-un middleware se decodeaza tokenul userului autentificat si verifica ce rol are.

In mod normal rutele ce nu pot fi accesate decat cu un scope ar trebui sa dea redirect, insa este o problema cu hookul useNavigate.

Structura proiectului:

  In folderul principal se afla 2 subfolder: 
    -client: fisierele create pentru partea de front-end
    -server: fisierele create pentru partea de back-end


  Folderul server este structurat astfel:
    - controllers: este folderul in care se află fisierele cu functiile ce primesc requesturile de pe partea de client, proceseaza acele requesturi si trimit un                          response inapoi.
    - middleware:
          - emailMiddleware.js: in acest fisier se afla functia ce intercepteza header-ul email, este folosit pentru a ajuta la login dat fiind ca intai se introduce               emailul si apoi verifica in baza de date ce tip de utilizator e asociat cu acest email ca mai apoi sa se introduca si parola.
          
          - verifyAuth.js: in acest fisier se afla functia ce intercepteaza header-ul trimis de catre front-end, in care se afla token-ul de autentificare, verifica ce           rol are utilizatorul, pentru a da acces la actiuni, iar apoi trimite mai departe catre server un request cu date despre utilizator.
          
    -models: in acest folder se afla fisierele cu schemele necesare pentru a crea si stoca datele in MongoDB.
    -routes: folderul de fisiere in care se afla endpointurile cu controllerele aplicatiei create de express, vor fi accesate din front-end.
    -index.js: in acest fisier se afla aplicatia express, unde este configurata si conectata la baza de date cu string-ul dat de MongoDB.
    
  Folderul client este structurat astfel:
    -public:
       -index.html: radacina aplicatiei ReactJs.
       
    -src:
      -components: fisierele cu componentele copil React ale aplicatiei.
      
      -redux: in acest folder se afla logica Redux:
          -api.js: in acest fisier se afla api-ul ce acceseaza enpointurile create in aplicatie de server si interceptorul ce trimite requestul cu headerurile                    customizate catre back-end.
          
          -groupProvider.js: fisierul cu reducerii si functiile asincrone necesare pentru a trimite functiile create in fisierul cu API mai departe catre server, in el           se afla logica necesara pentru a crea si a citi clasele.
          
          -userProvider.js: in acest fisier se afla logica necesara pentru a verifica emailurile cu care utilizatorii vor sa se autentifice, de a crea si verifica                parolele, de a citi, sterge, edita utilizatorii.
          
          -store.js: in acest fisier se afla toti reducerii si obiectele cu stari create in providerii de mai sus, acesta va fi pasat aplicatiei pentru a putea fi                accesat de oriunde din aceasta.
          
       -routes: folderul cu componentele parinte, ce sunt si rutele aplicatiei.
       
       -App.js: in acest fisier este creata aplicatia cu toate rutele de mai sus
       
       -index.js: in acest fisier se afla radacina ce randeaza toata aplicatia.
       
