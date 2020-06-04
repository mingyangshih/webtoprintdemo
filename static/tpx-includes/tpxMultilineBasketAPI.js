/*
Taopix Multi Line Basket API Example
Version 2.0.8 - Tuesday, 18 February 2020
For use with Taopix 2020r1
Copyright 2011 - 2020 Taopix Limited
*/

var kServerURL = 'https://staging.cloudw2p.com/' // kServerURL needs to be set to the weburl for the corresponding brand in Taopix Control Centre.
var kGTMID = '' // kGTMID needs to be set if you wish to use Google Tag Manager. Set this to be you Google Tag Manager ID
var gBasketCount = 0
var gBasketLoaded = false
var gProjectListLoaded = false
var gProjectListCount = 0
var gOldBasketCount = 0
var gContinueShoppingMessageEnabled = 1

var kStr_LabelMyProjects = 'en My Projects<p>cs Moje projekty<p>da Mine projekter<p>de Meine Projekte<p>es Mis Proyectos<p>fi Omat projektit<p>fr Mes projets<p>it I Miei Progetti<p>ja マイプロジェクト<p>ko 내 프로젝트<p>nl Mijn projecten<p>no Mine prosjekter<p>pl Moje projekty<p>pt Meus projetos<p>ru Мои проекты<p>sv Mina projekt<p>th โปรเจ็คของฉัน<p>zh_cn 我的项目<p>zh_tw 我的作品<p>mk Мои проекти'
var kStr_LabelBasket = 'en Basket<p>cs Košík<p>da Indkøbskurv<p>de Warenkorb<p>es Carrito<p>fi Kori<p>fr Panier<p>it Carrello<p>ja バスケット<p>ko 장바구니<p>nl Winkelmandje<p>no Handlekurv<p>pl Koszyk<p>pt Carrinho<p>ru Корзина<p>sv Korg<p>th ตะกร้า<p>zh_cn 购物车<p>zh_tw 購物車<p>mk Кошничка'
var kStr_LabelRemoveFromBasket = 'en Remove From Basket<p>cs Vyjmout z košíku<p>da Fjern fra indkøbskurv<p>de aus dem Warenkorb entfernen<p>es Eliminar del Carrito<p>fi Poista korista<p>fr Supprimer du panier<p>it Rimuovi Dal Carrello<p>ja バスケットから削除する<p>ko 장바구니에서 삭제<p>nl Uit winkelmandje verwijderen<p>no Fjern fra handlekurv<p>pl Usuń z koszyka<p>pt Remover do carrinho<p>ru Удалить из корзины<p>sv Ta bort från korg<p>th ลบออกจากตะกร้า<p>zh_cn 从购物车删除<p>zh_tw 從購物車刪除<p>mk Извади од кошничка'
var kStr_ButtonEmptyBasket = 'en Empty Basket<p>cs Prázdný košík<p>da Tøm indkøbskurv<p>de leerer Warenkorb<p>es Vaciar Carrito<p>fi Tyhjenn kori<p>fr Vider le panier<p>it Svuota Carrello<p>ja バスケットを空にする<p>ko 빈 장바구니<p>nl Winkelmandje legen<p>no Tøm handlekurv<p>pl Pusty koszyk<p>pt Esvaziar carrinho<p>ru Очистить корзину<p>sv Töm korg<p>th ล้างตะกร้า<p>zh_cn 清空购物车<p>zh_tw 清空購物車<p>mk Празна кошничка'
var kStr_ButtonCheckout = 'en Checkout<p>cs Pokladna<p>da Til kassen<p>de Abmelden<p>es Finalizar Compra<p>fi Kassa<p>fr Paiement<p>it Procedi<p>ja チェックアウト<p>ko 점검<p>nl Afrekenen<p>no Gå til kassen<p>pl Zamów<p>pt Finalizar pedido<p>ru Оформить заказ<p>sv Gå till kassan<p>th เช็คเอ้าท์<p>zh_cn 结账<p>zh_tw 結賬<p>mk Одјава'
var kStr_LabelSignIn = 'en Sign In<p>cs Přihlásit<p>da Log på<p>de Anmelden<p>es Registrarse<p>fi Kirjaudu<p>fr Connectez-vous<p>it Accedere<p>ja サインイン<p>ko 로그인<p>nl Aanmelden<p>no Logg inn<p>pl Zaloguj<p>pt Entre<p>ru Вход<p>sv Logga in<p>th เข้าสู่ระบบ<p>zh_cn 登录<p>zh_tw 登入'
var kStr_LabelLogout = 'en Log Out<p>cs Odhlásit<p>da Log af<p>de Abmelden<p>es Salir<p>fi Kirjaudu ulos<p>fr Déconnexion<p>it Log Out<p>ja ログアウト<p>ko 로그 아웃<p>nl Uitloggen<p>no Logg ut<p>pl Wyloguj<p>pt Logout<p>ru Выйти<p>sv Logga ut<p>th ออกจากระบบ<p>zh_cn 退出<p>zh_tw 登出'
var kStr_LabelEdit = 'en Edit<p>cs Editovat<p>da Rediger<p>de Bearbeiten<p>es Editar<p>fi Muokkaa<p>fr Editer<p>it Modificare<p>ja 編集<p>ko 편집<p>nl Bewerken<p>no Endre<p>pl Edytuj<p>pt Editar<p>ru Редактировать<p>sv Redigera<p>th แก้ไข<p>zh_cn 编辑<p>zh_tw 編輯'
var kStr_LabelRename = 'en Rename<p>cs Přejmenovat<p>da Omdøb<p>de Umbenennen<p>es Renombrar<p>fi Nimeä uudelleen<p>fr Renommer<p>it Rinomina<p>ja リネーム<p>ko 이름 바꾸기<p>nl Hernoem project<p>no Rename<p>pl Zmień nazwę<p>pt Renomear<p>ru Переименовать<p>sv Byt namn<p>th เปลี่ยนชื่อ<p>zh_cn 重命名<p>zh_tw 重命名'
var kStr_LabelDuplicate = 'en Duplicate<p>cs Duplikovat<p>da Dupliker<p>de Duplizieren<p>es Duplicar<p>fi Monista<p>fr Dupliquer<p>it Duplica<p>ja 複製<p>ko 중복<p>nl Dupliceer project<p>no Duplicate<p>pl Powiel<p>pt Duplicar<p>ru Дублировать<p>sv Kopiera<p>th ทำซ้ำ<p>zh_cn 复制<p>zh_tw 複製'
var kStr_LabelDelete = 'en Delete<p>cs Smazat<p>da Slet<p>de Löschen<p>es Borrar<p>fi Poista<p>fr Supprimer<p>it Cancella<p>ja 削除<p>ko 삭제<p>nl Verwijder project<p>no Delete<p>pl Usuń<p>pt Deletar<p>ru Удалить<p>sv Ta bort<p>th ลบ<p>zh_cn 删除<p>zh_tw 刪除'
var kStr_LabelLayoutName = 'en Layout Name<p>cs Název layoutu<p>da Layoutnavn<p>de LayoutName<p>es Nombre de plantilla<p>fi Asettelun nimi<p>fr Nom de mise en page<p>it Nome Layout<p>ja レイアウト名<p>ko 레이아웃명<p>nl Layout naam<p>no Layout-navn<p>pl Nazwa szablonu<p>pt Nome do layout<p>ru Имя макета<p>sv Layoutnamn<p>th ชื่อเลย์เอาท์<p>zh_cn 模板名字<p>zh_tw 模板名字'
var kStr_LabelMyAccount = 'en My Account<p>cs Můj účet<p>da Min konto<p>de Mein Konto<p>es Mi Cuenta<p>fi Oma tili<p>fr Mon compte<p>it Il Mio Account<p>ja マイアカウント<p>ko 마이 페이지<p>nl Mijn account<p>no Min konto<p>pl Moje konto<p>pt Minha Conta<p>ru Моя учетная запись<p>sv Mitt konto<p>th บัญชีของฉัน<p>zh_cn 我的账号<p>zh_tw 我的帳戶'
var kStr_LabelRegister = "en Register<p>cs Registrovat<p>da Registrer<p>de Registrieren<p>es Registro<p>fi Rekisteröidy<p>fr S'enregistrer<p>it Registrazione<p>ja 登録<p>ko 회원가입<p>nl Registreer<p>no Registrer deg<p>pl Rejestracja<p>pt Registrar<p>ru Зарегистрироваться<p>sv Registrera<p>th ลงทะเบียน<p>zh_cn 注册<p>zh_tw 註冊"
var kStr_LabelRenameProject = 'en Rename Project<p>cs Přejmenovat projekt<p>da Omdøb projekt<p>de Projekt umbenennen<p>es Cambiar el nombre de Proyecto<p>fi Nimeä projekti uudelleen<p>fr Renommer le projet<p>it Rinomina il Progetto<p>ja プロジェクト名をリネーム<p>ko 이름 바꾸기<p>nl Project hernoemen<p>no Gi nytt navn til prosjekt<p>pl Zmiana nazwy projektu<p>pt Renomear projeto<p>ru Переименовать проект<p>sv Byt namn på projekt<p>th เปลี่ยนชื่อโปรเจ็ค<p>zh_cn 重命名作品<p>zh_tw 重命名作品'
var kStr_LabelProjectName = 'en Project Name<p>cs Název projektu<p>da Projektnavn<p>de Projektname<p>es Nombre del Proyecto<p>fi Projektin nimi<p>fr Nom du projet<p>it Nome Del Progetto<p>ja プロジェクト名<p>ko 프로젝트 이름<p>nl Projectnaam<p>no Prosjektnavn<p>pl Nazwa projektu<p>pt Nome do projeto<p>ru Название проекта<p>sv Projektnamn<p>th ชื่องาน<p>zh_cn 作品名称<p>zh_tw 作品名稱'
var kStr_ButtonDoNotContinue = 'en Do Not Continue<p>cs Nepokračovat<p>da Fortsæt ikke<p>de Nicht Weiter<p>es No Continuar<p>fi Älä jatka<p>fr Abandonner<p>it Interrompere<p>ja 続けない<p>ko 진행 중단<p>nl Ga niet verder<p>no Ikke fortsett<p>pl Nie kontynuuj<p>pt Não continuar<p>ru Не продолжать<p>sv Fortsätt inte<p>th ห้ามดำเนินการต่อ<p>zh_cn 不继续<p>zh_tw 不繼續'
var kStr_ButtonContinue = 'en Continue<p>cs Pokračovat<p>da Fortsæt<p>de Weiter<p>es Continuar<p>fi Jatka<p>fr Continuer<p>it Continuare<p>ja 続ける<p>ko 계속 진행<p>nl Ga verder<p>no Fortsett<p>pl Kontynuuj<p>pt Continuar<p>ru Продолжить<p>sv Fortsätt<p>th ต่อไป<p>zh_cn 下一步<p>zh_tw 繼續'
var kStr_LabelPleaseConfirm = 'en Please Confirm!<p>cs Potvrďte prosím!<p>da Bekræft!<p>de Bitte bestätigen<p>es ¡Confirme por favor!<p>fi Ole hyvä ja vahvista!<p>fr Merci de confirmer !<p>it Confermare!<p>ja 確認してください!<p>ko 확인해주세요!<p>nl Bevestig deze actie<p>no Please Confirm!<p>pl Potwierdzenie usunięcia<p>pt Favor confirmar!<p>ru Пожалуйста подтвердите!<p>sv Bekräfta.<p>th กรุณายืนยัน!<p>zh_cn 请确认<p>zh_tw 請確認'
var kStr_ButtonYes = 'en Yes<p>cs Ano<p>da Ja<p>de Ja<p>es Sí<p>fi Kyllä<p>fr Oui<p>it Si<p>ja はい<p>ko 예<p>nl Ja<p>no Ja<p>pl Tak<p>pt Sim<p>ru Да<p>sv Ja<p>th ใช่<p>zh_cn 是<p>zh_tw 是'
var kStr_ButtonNo = 'en No<p>cs Ne<p>da Nej<p>de Nein<p>es No<p>fi Ei<p>fr Non<p>it No<p>ja いいえ<p>ko 아니오<p>nl Nee<p>no Nei<p>pl Nie<p>pt Não<p>ru Нет<p>sv Nej<p>th ไม่ใช่<p>zh_cn 否<p>zh_tw 否'
var kStr_ButtonCancel = 'en Cancel<p>cs Storno<p>da Anuller<p>de Abbrechen<p>es Cancelar<p>fi Peruuta<p>fr Annuler<p>it Annullare<p>ja キャンセル<p>ko 취소<p>nl Annuleren<p>no Avbryt<p>pl Anuluj<p>pt Cancelar<p>ru Отмена<p>sv Avbryt<p>th ยกเลิก<p>zh_cn 取消<p>zh_tw 取消'
var kStr_ButtonOK = 'en OK<p>cs OK<p>da OK<p>de OK<p>es OK<p>fi OK<p>fr OK<p>it OK<p>ja OK<p>ko 좋습니다<p>nl OK<p>no OK<p>pl OK<p>pt OK<p>ru Окей<p>sv OK<p>th ตกลง<p>zh_cn 确定<p>zh_tw 確定'
var kStr_MessageDeleteProjectConfirmation = 'en Are you sure you want to delete ^0?<p>cs Skutečně chcete odstranit ^0?<p>da Er du sikker på, at du vil slette ^0?<p>de Sind Sie sicher, dass Sie dieses Projekt löschen wollen: ^0?<p>es ¿Seguro que quieres eliminar ^0?<p>fi Haluatko varmasti poistaa seuraavan: ^0?<p>fr Etes-vous sûr de vouloir supprimer ^0 ?<p>it Vuoi veramente cancellare ^0?<p>ja ^0を本当に削除しますか？<p>ko 정말 ^0 프로젝트를 삭제하시겠습니까?<p>nl Weet je zeker dat je ^0 wilt verwijderen?<p>no Are you sure you want to delete ^0?<p>pl Jesteś pewien, że chcesz usunąć projekt: ^0?<p>pt Está seguro que deseja deletar ^0?<p>ru Вы уверены, что хотите удалить ^0?<p>sv Är du säker på att du vill ta bort ^0?<p>th คุณต้องการลบโปรเจ็ค^0?<p>zh_cn 您确认您要删除^0吗?<p>zh_tw 您確定您要刪除嗎^0'
var kStr_MessageProjectOpenInShoppingCart = "en You have recently tried to order this project. It is recommended that you do not continue without first checking the order within the previously opened browser window.<br><br>Are you sure you wish to continue?<p>cs Nedávno jste se pokusil otevřím tento projekt. Je doporučeno nepokračovat bez předchozí kontroly objednávky v okně prohlížeče, které bylo předtím otevřeno.<br><br>Určitě chcete pokračovat?<p>da Du har for nylig forsøgt at bestille dette projekt. Det anbefales, at du ikke fortsætter, før du har kontrolleret ordren i det tidligere åbnede browservindue.<br><br>Er du sikker på, at du vil fortsætte?<p>de Sie haben bereits versucht, dieses Projekt zu bestellen. Bevor Sie fortfahren, empfehlen wir Ihnen die geöffneten Fenster in Ihrem Browser zu prüfen.<br><br>Möchten Sie wirklich fortfahren?<p>es Usted ha tratado recientemente de ordenar este proyecto. Se recomienda que usted no continúe sin revisar primero la orden en la ventana del navegador abierta previamente. <br><br>¿Seguro que desea continuar?<p>fi Olet äskettäin yrittänyt tilata tämän projektin. Ennen kuin jatkat, suosittelemme, että tarkistat tilauksen aiemmin avatussa selainikkunassa.<br><br>Haluatko varmasti jatkaa?<p>fr Vous avez récemment essayé de passer commande de ce projet. Il est recommandé de ne pas continuer avant d'avoir d'abord vérifié la commande dans la fenêtre de navigation ouverte précédemment.<br><br>Etes-vous sûr de vouloir continuer ?<p>it Hai recentemente cercato di ordinare questo progetto. Si raccomanda di non continuare senza prima aver verificato l'ordine nella finestra del browser aperta precedentemente.<br><br>Vuoi veramente continuare?<p>このプロジェクトをオーダーしようとしています。オーダーする前に、以前開いていたブラウザウィンドウ内でのオーダーを確認することをお勧めします。<br><br>続けてよろしいですか？<p>ko 장바구니에서 프로젝트 열기<p>mk Вие неодамна се обидовте да го нарачате овој проект. Ние препорачуваме да не продолжувате со порачката пред проверка на нарачката во претходно отворениот прозорец.<br><br>али сте сигурни дека сакате да продолжите??<p>nl Je hebt onlangs geprobeerd dit project te bestellen. We raden aan niet verder te gaan en eerst het project te bekijken in het eerder geopende scherm. <br><br> Weet je zeker dat je door wilt gaan?<p>no Du har nylig forsøkt å bestille dette prosjektet. Vi anbefaler at du ikke fortsetter uten at du først kontrollerer bestillingen i nettleservinduet som du åpnet tidligere.<br><br>Er du sikker på at du vil fortsette?<p>pl Niedawno próbowano zamówić ten projekt. Zaleca się, aby nie kontynuować do momentu sprawdzenia projektu w drugim oknie.<br><br>Czy na pewno chcesz kontynuować?<p>pt Você tentou finalizar esse pedido recentemente. Recomenda-se não continuar sem verificar o pedido na janela anterior aberta no browser.<br><br>Deseja continuar?<p>ru Вы недавно пытались оформить этот заказ. Рекомендуется не продолжать, не проверив статус заказа в ранее открытом окне браузера.<br><br>Вы уверены, что хотите продолжить?<p>sv Du har nyligen försökt beställa det här projektet. Vi rekommenderar att du inte fortsätter om du inte först kontrollerar beställningen i det tidigare öppnade webbläsarfönstret.<br><br>Är du säker på att du vill fortsätta?<p>th คุณได้ทำการสั่งซื้อโปรเจ็คนี้ไป แนะนำว่าไม่ควรดำเนินการต่อหากคุณยังไม่ได้ตรวจสอบการสั่งซื้อในหน้าต่างอื่นที่คุณดำเนินการไว้.<br><br>ต้องการดำเนินการต่อหรือไม่?<p>zh_cn 你最近尝试订购此项目。首先建议您不要继续，先检查打开浏览器窗口中的订购。<br><br>点击看你，确定要继续吗？<p>zh_tw 你最近嘗試訂購該項目。首先建議您不要繼續，先檢查打開瀏覽器窗口中的訂購。<br><br>點擊查看，你確定要繼續嗎？"
var kStr_MessageProjectAddedToBasket = 'en Project added to basket<p>cs Projekt byl přidán do košíku<p>de Projekt wurde zum Warenkorb hinzugefügt<p>ja バスケットに追加されたプロジェクト<p>ru Проект добавлен в корзину<p>zh_cn 把作品添加到购物篮<p>zh_tw 把項目添加到購物籃<p>mk Проектот е додаден во кошничката<p>nl Project toegevoegd aan mandje<p>es Proyecto agregado a la cesta<p>pt Projeto enviado para o carrinho<p>it Progetto aggiunto al carrello<p>sv Projekt lagt i varukorgen<p>pl Projetk dodany do koszyka<p>ko 프로젝트가 장바구니에 추가되었습니다.<p>fr Projet ajouté au panier'
var kStr_ButtonCheckoutNow = 'en Checkout Now<p>cs Objednat nyní<p>de Jetzt Abmelden<p>ja 今チェックアウト<p>ru Оформить заказ cейчас<p>zh_cn 现在结账<p>zh_tw 現在去付款<p>mk Одјава сега<p>nl Naar de kassa<p>es Pagar ahora<p>pt Finalizar pedido<p>it Concludi Adesso<p>sv Checka ut nu<p>pl Sprawdź teraz<p>ko 지금 결제하기<p>fr Finaliser la commande'
var kStr_ButtonContinueShopping = 'en Continue Shopping<p>cs Pokračovat v nákupu<p>de Weiter einkaufen<p>ja ショッピングを続ける<p>ru Продолжить покупки<p>zh_cn 继续购物<p>zh_tw 繼續購物<p>mk Продолжи со купување<p>nl Verder winkelen<p>es Seguir comprando<p>pt Continuar comprando<p>it Prosegui con gli Acquisti<p>sv Fortsätt handla<p>pl Kontynuuj zakupy<p>ko 쇼핑 계속하기<p>fr Continuer vos achats'
var kStr_BasketIsEmpty = 'en Your basket is currently empty<p>cs Váš košík je momentálně prázdný <p>da Din kurv er i øjeblikket tom<p>de Ihr Warenkorb ist leer<p>fi Ostoskorisi on tyhjä <p>es Su cesta está actualmente vacía.<p>ko 장바구니가 비어있습니다.<p>fr Votre panier est actuellement vide<p>it Il tuo carrello è attualmente vuoto<p>ja あなたのバスケットは現在空です<p>mk Вашата кошничка моментално е празна<p>nl Uw mandje is nog leeg<p>no Handlekurven er tom<p>ru Ваша корзина заказов пуста<p>sv Din varukorg är tom<p>th ตะกร้าของคุณว่างเปล่า<p>zh_tw 您的購物籃是空的<p>pt Seu carrinho está temporariamente vazio'
var kStr_ProjectIsEmpty = "en You don't have any saved projects.<p>cs Nemáte žádné uložené projekty.<p>da Du har ingen gemte projekter.<p>de Es wurden keine gespeicherten Projekte gefunden.<p>fi Sinulla ei ole tallennettuja projekteja.<p>es No tiene ningún proyecto guardado.<p>ko 저장된 프로젝트가 없습니다.<p>fr Vous n'avez aucun projet sauvegardé.<p>it Non hai nessun progetto salvato.<p>ja 保存されているプロジェクトはありません。<p>mk Немате ниту еден снимен проект.<p>nl U heeft geen opgeslagen projecten.<p>no Du har ingen lagrede prosjekter.<p>ru У вас нет сохраненных проектов.<p>sv Du har inga sparade projekt.<p>th คุณไม่มีโปรเจคที่บันทึกไว้.<p>zh_tw 您沒有保存任何的作品項目.<p>pt Você não tem Projetos salvos."
var kStr_MessageEmptyBasketPopupMessage = 'en Emptying your basket will cancel any checkout sessions you have started.<p>zh_cn 如清空购物篮，将取消已开始的所有结帐会话。<p>ru Очистка корзины заказов, отменит все активные  заказы.<p>zh_tw 清空購物籃將取消已開始的所有結帳會話。<p>ja バスケットを空にすると、開始したすべてのチェックアウトセッションがキャンセルされます。<p>de Wenn Sie den Warenkorb leeren, werden alle Einkaufsvorgänge abgebrochen.<p>cs Vymazání obsahu košíku bude mít za následek přerušení rozdělané objednávky.<p>nl Als u uw winkelmandje leegmaakt, worden alle betaalsessies die u bent begonnen geannuleerd.<p>fr Vider votre panier annulera toutes les commande en cours.<p>es Vaciar su cesta cancelará cualquier sesión de pago que haya iniciado.<p>ko 장바구니를 비우면 모든 항목이 취소됩니다.<p>pt Esvaziar seu carrinho de compras irá cancelar todas as sessões de checkout que você iniciou.<p>it Lo svuotamento del tuo carrello cancellerà ogni sessione di conclusione che hai avviato.<p>mk Празнењето на Вашата кошничка, ќе ги прекинете наплатните сесии кои ги имате започнато.<p>da Hvis du tømmer din kurv, annulleres alle Gå til kassen-sessioner, du har startet.<p>fi Jos tyhjennät ostoskorin, aloitetut uloskuittausistunnot peruutetaan.<p>no Dersom du tømmer handlekurven, vil alle kasseøkter avbrytes.<p>sv Om du tömmer varukorgen avbryts alla kassasessioner som du har påbörjat.<p>pl Opróżnienie koszyka spowoduje anulowanie rozpoczętych sesji.'
var kStr_MessageRemoveItemFromBasketPopupMessage = 'en Removing an item from your basket will cancel any checkout sessions you have started.<p>zh_cn 如果从您的购物篮中删除项目，将取消您已开始的所有结帐会话。<p>ru Удаление элемента из корзины заказа, отменит все запущенные сеансы оформления заказа.<p>zh_tw 從您的購物籃中删除項目將取消您已開始的所有結帳會話。<p>ja バスケットからアイテムを削除すると、開始したすべてのチェックアウトセッションがキャンセルされます。<p>de Wenn Sie eine Position aus dem Warenkorb entfernen, warden alle Einkaufsvorgänge abgebrochen.<p>cs Odstranění položky z vašeho košíku bude mít za následek přerušení rozdělané objednávky.<p>nl Als u een artikel uit uw winkelmandje verwijdert, worden alle betaalsessies die u bent begonnen geannuleerd.<p>fr Supprimer un article de votre panier annulera toutes commandes en cours.<p>es Eliminar un artículo de su cesta cancelará cualquier sesión de pago que haya iniciado.<p>ko 장바구니에서 항목을 제거하시면 시작한 모든 세션이 취소됩니다.<p>pt Remover um item do seu carrinho de compras irá cancelar todas as sessões de checkout que você iniciou.<p>it La rimozione di un elemento dal tuo carrello cancellerà ogni sessione di conclusione che hai avviato.<p>mk Бришењето на ставка од вашата кошничка, ќе ги прекинете наплатните сесии кои ги имате започнато.<p>da Hvis du fjerner en vare fra din kurv, annulleres alle Gå til kassen-sessioner, du har startet.<p>fi Jos poistat kohteen ostoskorista, aloittamasi uloskuittausistunnot peruutetaan.<p>no Dersom du fjerner en vare fra kurven, vil alle kasseøkter avbrytes.<p>sv Om du tar bort en artikel från varukorgen avbryts alla kassasessioner som du har påbörjat.<p>pl Usunięcie przedmiotu z koszyka spowoduje anulowanie rozpoczętych sesji.'
var kStr_ButtonRemoveItem = 'en Remove Item<p>zh_cn 移除项目<p>ru Удалить элемент<p>zh_tw 移除項目<p>ja アイテムを削除<p>de Position entfernen<p>cs Odstranit položku<p>nl Verwijder Item<p>fr Supprimer l’article<p>es Remover el artículo<p>ko 항목 삭제<p>pt Remover item<p>it Rimuovi elementi<p>mk Избриши ја ставката<p>da Fjern vare<p>fi Poista kohde<p>no Fjern vare<p>sv Ta bort artikel<p>pl Usuń przedmiot'
var kStr_LabelShare = 'en Share<p>cs Sdílet<p>da Del<p>de Teilen<p>es Compartir<p>fi Jaa<p>fr Partager<p>it Condividere<p>ja 共有<p>ko 공유<p>mk Сподели<p>nl Delen<p>no Del<p>pl Udostępnij<p>pt Compartilhar<p>ru Поделиться<p>sv Dela<p>th แบ่งปัน<p>zh_cn 分享<p>zh_tw 分享'
var kStr_LabelClose = 'en Close<p>zh_tw 關閉<p>zh_cn 关闭<p>th ปิด<p>sv Stäng<p>ru Закрыть<p>pt Fechar<p>pl Zamknij<p>no Lukk<p>nl Sluiten<p>mk Затвори<p>ko 닫기<p>ja 閉じる<p>it Chiudere<p>fr Fermer<p>fi Sulje<p>es Cerrar<p>de Schliessen<p>da Luk<p>cs Zavřít'
var kStr_LabelShareLink = 'en Share by link<p>cs Odkaz ke sdílení<p>de Link teilen<p>es Compartir enlace<p>fr Lien de partage<p>it Condividi link<p>ja 共有リンク<p>ko 공유 링크<p>nl Deel link<p>pl Udostępnij link<p>pt Compartilhar link<p>ru Поделиться ссылкой<p>sv Dela länk<p>zh_cn 分享链接<p>zh_tw 分享連結<p>mk споделете линк<p>th แบ่งปันลิงค์'
var kStr_ButtonCopyLink = 'en Copy link<p>cs Zkopírovat odkaz<p>de Link kopieren<p>es Copiar enlace<p>fr Copier le lien<p>it Copia link<p>ja リンクをコピー<p>ko 링크 복사하기<p>nl Kopiëer link<p>pl Skopiuj link<p>pt Copiar link<p>ru Скопировать ссылку<p>sv Kopiera länk<p>zh_cn 复制链接<p>zh_tw 複製連結<p>mk копирајте линк<p>th คัดลอกลิงค์'
var kStr_ToolTipLinkCopied = 'en Link copied to clipboard<p>cs Odkaz zkopírován do schránky<p>de Link wurde in die Zwischenablage kopiert<p>es Enlace copiado al portapapeles<p>fr Lien copié dans le presse-papiers<p>it Link copiato negli appunti<p>ja リンクがクリップボードにコピーされました<p>ko 클립보드에 링크가 복사되었습니다.<p>nl Link naar plakbord gekopiëerd<p>pl Link skopiowany do schowka<p>pt Link copiado para a área de transferência<p>ru Ссылка скопирована в буфер обмена<p>sv Länk kopierad till urklipp<p>th Link ที่คัดลอกไปยัง clipboard<p>zh_cn 链接已复制到剪贴板<p>zh_tw 連結已複製在剪貼簿上<p>mk линкот е копиран на вашата табла'

var kSSOOff = 0
var kSSOSignIn = 1
var kSSOAutomatic = 2
var kBasketInternalError = 33
var kBasketExpired = 34
var kBasketSessionExpired = 35

var gSSOEnabled = kSSOOff
var gSSOToken = ''

function tpxGetBrowserLocale () {
  // determine the browser locale either from the browser
  var browserLanguage = 'en'

  if (navigator.userLanguage) {
    browserLanguage = navigator.userLanguage
  } else if (navigator.language) {
    browserLanguage = navigator.language
  }

  // get the first (main) browser language
  var browserLanguageArray = browserLanguage.split(',')
  browserLanguage = browserLanguageArray[0].toLowerCase()

  switch (browserLanguage) {
    case 'zh-tw':
    case 'zh-cn':
    {
      // don't do anything if the language is set to Chinese as we need to detect
      // if it is Chinese Traditional or Chinese Simplified

      break
    }
    default:
    {
      // if the language code is longer than 2 characters (i.e en-GB) then
      // we only need the first 2 characters (en) for the language code

      if (browserLanguage.length > 2) {
        browserLanguage = browserLanguage.substring(0, 2)
      }
      break
    }
  }

  return browserLanguage.replace('-', '_')
}

function tpxGetUrlVar (key) {
  var result = new RegExp(key + '=([^&]*)', 'i').exec(window.location.search)
  return result && unescape(result[1]) || ''
}

function tpxGetLocaleString (pLocalizedString) {
  // return the correct language string
  var result = ''
  var firstAvailable = ''
  var defaultLanguage = ''

  var locale = tpxGetBrowserLocale()

  var locale2 = locale.substring(0, 2)

  var localizedStringList = pLocalizedString.split('<p>')
  var localizedCount = localizedStringList.length

  for (var i = 0; i < localizedCount; i++) {
    // split each language item into its code and name
    var charPos = localizedStringList[i].indexOf(' ')
    var localizedItemCode = localizedStringList[i].substring(0, charPos)
    var localizedItemCode2 = localizedItemCode.substring(0, 2)
    var localizedItemString = localizedStringList[i].substring(charPos + 1)

    if ((firstAvailable == '') && (localizedItemString != '')) {
      firstAvailable = localizedItemString
    }

    if (localizedItemCode == 'en') {
      defaultLanguage = localizedItemString
    }

    // check for english as a last resort
    // if not chinese, attempt to match based on the first two characters to handle regions
    // if we get an exact match on the full language code or the first two characters of the input code we always use this one
    if ((result == '') && (localizedItemCode2 == 'en')) {
      result = localizedItemString
    } else if ((localizedItemCode2 == locale2) && (locale2 != 'zh')) {
      result = localizedItemString
    } else if (localizedItemCode == locale) {
      result = localizedItemString
      break
    } else if (localizedItemCode == locale2) {
      result = localizedItemString
      break
    }
  }

  if (result == '') {
    if (defaultLanguage != '') {
      result = defaultLanguage
    } else {
      result = firstAvailable
    }
  }

  return result
}

function tpxGetXMLHTTP () {
   	var xhttp

  if (window.XMLHttpRequest) {
    xhttp = new XMLHttpRequest()
  } else {
    // code for IE6, IE5
    xhttp = new ActiveXObject('Microsoft.XMLHTTP')
  }

  return xhttp
}

function tpxReadCookie (pName) {
  var nameEQ = pName + '='
  var ca = document.cookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) == ' ') {
      c = c.substring(1, c.length)
    }

    if (c.indexOf(nameEQ) == 0) {
      return c.substring(nameEQ.length, c.length)
    }
  }

  return null
}

function tpxAddGoogleTrackingParameter (pParamArray, pCallback) {
  // make sure there is the _ga cookie and google analytics is referenced
  if (typeof ga === 'function') {
    if (tpxReadCookie('_ga')) {
      ga(function () {
        var trackers = ga.getAll()
        if (trackers.length) {
			    	var linkerParam = trackers[0].get('linkerParam')
			    	var linkerParamParts = linkerParam.split('=')
			    	pParamArray[linkerParamParts[0]] = linkerParamParts[1]

			    	pCallback(pParamArray)
			  	}
      })
    }
  } else {
    pCallback(pParamArray)
  }
}

function tpxCreateBasketCountCookie () {
  if (gContinueShoppingMessageEnabled) {
    var expireDate = new Date()
    expireDate.setTime(expireDate.getTime() + (30 * 24 * 60 * 60 * 1000))
    var basketCountExpires = expireDate.toUTCString()

    tpxCreateCookie('mawhlbc', gBasketCount, basketCountExpires)
  }
}

function tpxCreateCookie (name, value, expires) {
  var cookieString = name + '=' + value + '; expires=' + expires + '; path=/'

  if (document.location.protocol === 'https:') {
    	cookieString += '; secure'
  }

  document.cookie = cookieString
}

function tpxDeleteCookie (name) {
  tpxCreateCookie(name, null, 'Thu, 01 Jan 1970 00:00:00 UTC')
}

function tpxGenerateID () {
  var result = ''
  var date = new Date()
  var timeStamp = String(date.getTime())
  var len = timeStamp.length
  var charCode = 0

  for (var i = 0; i < len; i++) {
    	charCode = timeStamp.charCodeAt(i)
    	result += 138 - charCode - i
  	}

  return result
}

function tpxCreateMAWHLUIDCookie () {
  var date = new Date()
  date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000))
  var value = tpxGenerateID()

  tpxCreateCookie('mawhluid', value, date.toGMTString())
}

function tpxIsEmpty (obj) {
  return (Object.getOwnPropertyNames(obj).length === 0)
}

function tpxParamString (pSourceString) {
  var args = arguments

  for (var i = 0; i < arguments.length; i++) {
    pSourceString = pSourceString.replace('^' + String(i - 1), args[i])
  }

  return pSourceString
}

function tpxCreateRandomString (pLength) {
  return Math.round((Math.pow(36, pLength + 1) - Math.random() * Math.pow(36, pLength))).toString(36).slice(1)
}

function tpxAddGETParam (pURL, pKey, pValue) {
  var connector = '?'

  if (/[?&]/.test(pURL)) {
    connector = '&'
  }

  return pURL += connector + pKey + '=' + pValue
}

/**
 * Determine whether [clipboardAPI] document.execCommand('copy') is supported
 * Supported Browsers:
 * Firefox 41+, Chrome 42+, Safari 11+, Edge 16+ (76?), IE 10+
 * @param
 */
function tpxGetSupportsExecCommand () {
  // This should be feasible -- but testing on various browsers was inconsistent
  // return document.queryCommandSupported && document.queryCommandSupported("copy");
  var userAgent = navigator.userAgent

  // Version included for Safari
  var versionMatch = userAgent.match(/Version\/\d*/)

  var chromeMatch = userAgent.match(/Chrome\/\d*/)

  // Chrome on iOS uses CriOS and no Version Number
  var chromeIOSMatch = userAgent.match(/CriOS\/\d*/)

  var safariMatch = userAgent.match(/Safari\/\d*/)

  var firefoxMatch = userAgent.match(/Firefox\/\d*/)

  // Edge browser currently includes 'Chrome'
  var edgeMatch = userAgent.match(/Edge\/\d*/)

  // Unclear how stable this check is for IE
  var ieMatch = userAgent.match(/rv:\d*/)

  if (chromeMatch && !edgeMatch) {
    return parseInt(chromeMatch[0].slice(7)) > 42
  } else if (firefoxMatch) {
    return parseInt(firefoxMatch[0].slice(8)) > 41
  } else if (edgeMatch) {
    return parseInt(edgeMatch[0].slice(5)) > 17
  } else if (chromeIOSMatch) {
    return parseInt(chromeIOSMatch[0].slice(6)) > 42
  } else if (safariMatch && versionMatch && !edgeMatch) {
    return parseInt(versionMatch[0].slice(8)) > 11
  } else if (ieMatch) {
    return parseInt(ieMatch[0].slice(3)) > 10
  } else {
    return false
  }
}

function tpxHandleCopyLinkClick () {
  tpxCopyValueToClipboard('tpxsharelink')
  tpxFlashShareLinkTip()
}

function tpxFlashShareLinkTip () {
  var shareLinkTip = document.querySelector('#sharelink-tip')

  if (shareLinkTip.className.indexOf('tip-popout-visible')) {
    shareLinkTip.classList.remove('tip-popout-visible')
  }

  window.setTimeout(function () {
    shareLinkTip.classList.add('tip-popout-visible')
  }, 0)
}

/**
 * Copy the value of target element to clipboard
 * @param pElementID
 */
function tpxCopyValueToClipboard (pElementID) {
  var inputElement = document.querySelector('#' + pElementID)

  // iOS devices use setSelectionRange()
  if (navigator.userAgent.match(/ipad|iphone/i)) {
    inputElement.setSelectionRange(0, 999)
  } else {
    inputElement.select()
  }
  document.execCommand('copy')
  inputElement.selectionStart = inputElement.selectionEnd
  inputElement.blur()
}

function tpxHighLevelProcessRequest (pRequestFunction, pSetCookie, pParams, pSSOParams) {
  var serverPage = ''
  var fsAction = ''
  var callback = ''
  var requestMethod = 'POST'
  var performRequest = true
  var theDate = new Date()
  var timestamp = Math.round((theDate.getTime()) / 1000)
  var basketRef = ''
  var mawID = 0
  var language = tpxGetBrowserLocale()
  var mawIDLookup = tpxReadCookie('mawhluid')
  var basketRefLookUpValue = tpxReadCookie('mawebhlbr')

  // if the unique high level cookie has not been created then we must create it.
  if ((mawIDLookup != null) || (mawIDLookup != '')) {
    	mawID = mawIDLookup
  }

  if ((basketRefLookUpValue != null) && (basketRefLookUpValue != '')) {
    basketRef = basketRefLookUpValue
  }

  if ((gSSOEnabled != kSSOOff) && (pSetCookie)) {
    var cookieData = pRequestFunction + '|' + JSON.stringify(pParams)

    tpxCreateCookie('mawssoa', cookieData, 'Fri, 31 Dec 9999 23:59:59 GMT')
  }

  switch (pRequestFunction) {
    case 'tpxHighLevelCheckUserSessionControl':
      fsAction = '?fsaction=OnlineAPI.checkUserSession'
      callback = tpxHighLevelCheckUserSessionView
      break
    case 'tpxHighLevelCreateProjectControl':
      requestMethod = 'GET'
      callback = tpxHighLevelCreateProjectView
      fsAction = '?fsaction=OnlineAPI.createProject3&' + pParams['id'] + '&ssoenabled=' + pParams['ssoenabled'] + '&mawebhlbr=' + basketRef + '&prtz=' + timestamp + '&browserlocale=' + language

      // add the _ga google parameter is present
      if (pParams['_ga']) {
        fsAction += '&_ga=' + pParams['_ga']
      }

      break
    case 'tpxHighLevelEditProjectControl':
      fsAction = '?fsaction=OnlineAPI.hlEditProject'
      callback = tpxHighLevelEditProjectView
      break
    case 'tpxHighLevelDuplicateProjectControl':
      fsAction = '?fsaction=OnlineAPI.hlDuplicateProject'
      callback = tpxHighLevelDuplicateProjectView
      break
    case 'tpxHighLevelRenameProjectControl':
      fsAction = '?fsaction=OnlineAPI.hlRenameProject'
      callback = tpxHighLevelRenameProjectView
      break
    case 'tpxHighLevelDeleteProjectControl':
      fsAction = '?fsaction=OnlineAPI.hlDeleteProject'
      callback = tpxHighLevelDeleteProjectView
      break
    case 'tpxHighLevelGetBasketContentsControl':
      fsAction = '?fsaction=OnlineAPI.basketInit'
      callback = tpxHighLevelGetBasketContentsView

      if (gBasketLoaded) {
        performRequest = false
      }

      break
    case 'tpxHighLevelGetProjectListControl':
      fsAction = '?fsaction=OnlineAPI.hlViewProjectsList'
      callback = tpxHighLevelGetProjectListView

      if (gProjectListLoaded) {
        performRequest = false
      }

      break
    case 'tpxHighLevelEmptyBasketControl':
      fsAction = '?fsaction=OnlineAPI.emptyBasket'
      callback = tpxHighLevelEmptyBasketView
      break
    case 'tpxHighLevelRemoveItemFromBasketControl':
      fsAction = '?fsaction=OnlineAPI.removeItemFromBasket'
      callback = tpxHighLevelRemoveItemFromBasketView
      break
    case 'tpxHighLevelCheckoutControl':
      fsAction = '?fsaction=OnlineAPI.checkout'
      callback = tpxHighLevelCheckoutView
      break
    case 'tpxHighLevelSignInInitControl':
    case 'tpxHighLevelSignInInitControl2':
      fsAction = '?fsaction=OnlineAPI.signInInit'

      if (pRequestFunction == 'tpxHighLevelSignInInitControl') {
        callback = tpxHighLevelSignInInitView
      } else {
        callback = tpxHighLevelCheckUserSessionView
      }

      break
    case 'tpxHighLevelRegisterInitControl':
      fsAction = '?fsaction=OnlineAPI.registerInit'
      callback = tpxHighLevelRegisterInitView
      break
    case 'tpxHighLevelMyAccountInitControl':
      fsAction = '?fsaction=OnlineAPI.myAccountInit'
      callback = tpxHighLevelMyAccountInitView
      break
    case 'tpxHighLevelLogoutControl':
      fsAction = '?fsaction=OnlineAPI.hlLogout'
      callback = tpxHighLevelLogoutView
      break
    case 'tpxHighLevelShareProjectControl':
      fsAction = '?fsaction=OnlineAPI.highLevelShareProject'
      callback = tpxHighLevelShareProjectView
      break
  }

  serverPage = kServerURL + fsAction

  for (var key in pSSOParams) {
    serverPage = tpxAddGETParam(serverPage, key, encodeURIComponent(pSSOParams[key]))
  }

  if (performRequest) {
    /* get an XMLHttpRequest object for use */
    /* make xmlhttp local so we can run simlutaneous requests */
    var xmlhttp = tpxGetXMLHTTP()

    if (requestMethod == 'POST') {
      pParams['mawebhluid'] = mawID
      pParams['mawebhlbr'] = basketRef
      pParams['prtz'] = timestamp
      pParams['browserlocale'] = tpxGetBrowserLocale()
      pParams['ssotoken'] = gSSOToken

      xmlhttp.open('POST', serverPage, false)
      xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')

      var postParams = ''

      for (var key in pParams) {
        postParams += '&' + key + '=' + encodeURIComponent(pParams[key])
      }
    } else {
      serverPage = tpxAddGETParam(serverPage, 'dummy', new Date().getTime())
      serverPage = tpxAddGETParam(serverPage, 'ssotoken', gSSOToken)

      xmlhttp.open('GET', serverPage, true)
    }

    xmlhttp.onreadystatechange = function () {
      if ((xmlhttp.readyState == 4) && (xmlhttp.status == 200)) {
        var responseObj = JSON.parse(xmlhttp.responseText)

        if ((responseObj.result == kBasketInternalError) || (responseObj.result == kBasketExpired) || (responseObj.result == kBasketSessionExpired)) {
          gBasketCount = 0

          tpxDeleteCookie('mawuli')
          tpxDeleteCookie('mawebhlbr')

          if (pRequestFunction == 'tpxHighLevelCreateProjectControl') {
            // if the basket or session has expired then only for a create project action we must try to replay the createProject.
            // as we have deleted the basket cookie a new cookie will be generated when the action is replayed.
            tpxHighLevelProcessRequest('tpxHighLevelCreateProjectControl', true, pParams, {})
            return false
          } else {
            tpxHighLevelLoggedInStatusCallBack(0)
          }
        }

        switch (pRequestFunction) {
          case 'tpxHighLevelSignInInitControl':

            if (responseObj.result == -2) {
              // set basketcookie based of the token
              basketRef = responseObj.basketref
              basketCookieExpiryTime = responseObj.basketcookieexpirytime
              userCookieExpiryTime = responseObj.usercookieexpirytime

              var date = new Date()
              date.setTime(basketCookieExpiryTime * 1000)

              tpxCreateCookie('mawebhlbr', basketRef, date.toGMTString())

              var date = new Date()
              date.setTime(userCookieExpiryTime * 1000)

              tpxCreateCookie('mawuli', 1, date.toGMTString())

              gSSOToken = responseObj.ssotoken

              gBasketCount = 0
              gBasketLoaded = false
              gProjectListLoaded = false
              gProjectListCount = 0
            }
            break
          case 'tpxHighLevelSignInInitControl2':
          case 'tpxHighLevelCheckUserSessionControl':
            if (responseObj.result == 0) {
              // set basketcookie based of the token
              basketRef = responseObj.basketref
              basketCookieExpiryTime = responseObj.basketcookieexpirytime
              userCookieExpiryTime = responseObj.usercookieexpirytime
              gContinueShoppingMessageEnabled = responseObj.continueshoppingmessageenabled
              gContinueShoppingMessageEnabled = parseInt(gContinueShoppingMessageEnabled)

              if (isNaN(gContinueShoppingMessageEnabled)) {
                gContinueShoppingMessageEnabled = 1
              }

              var date = new Date()
              date.setTime(basketCookieExpiryTime * 1000)

              tpxCreateCookie('mawebhlbr', basketRef, date.toGMTString())

              var date = new Date()
              date.setTime(userCookieExpiryTime * 1000)

              tpxCreateCookie('mawuli', 1, date.toGMTString())

              gSSOToken = responseObj.ssotoken

              gBasketCount = responseObj.basketcount
              tpxCreateBasketCountCookie()

              tpxHighLevelLoggedInStatusCallBack(1)
            } else if ((responseObj.result == -1) || (responseObj.result > 0)) {
              tpxDeleteCookie('mawuli')

              if (((tpxGetUrlVar('odlo') == 1) && (responseObj.result == -1)) || (responseObj.result > 0) || ((responseObj.result == -1) && (gSSOEnabled != kSSOOff))) {
                tpxDeleteCookie('mawebhlbr')
              }
            } else if (responseObj.result == -2) {
              document.location = responseObj.ssoredirect
            }

            break
          case 'tpxHighLevelCreateProjectControl':

            if (responseObj.result == 0) {
              basketRef = responseObj.basketref
              cookieExpiryTime = responseObj.cookieexpirytime

              var date = new Date()
              date.setTime(cookieExpiryTime * 1000)

              tpxCreateCookie('mawebhlbr', basketRef, date.toGMTString())
            }

            break
          case 'tpxHighLevelGetBasketContentsControl':
            gBasketLoaded = true
            gBasketCount = responseObj.basketcount

            break
          case 'tpxHighLevelGetProjectListControl':

            if (responseObj.result != 0) {
              basketRef = responseObj.basketref
              cookieExpiryTime = responseObj.cookieexpirytime

              var date = new Date()
              date.setTime(cookieExpiryTime * 1000)

              tpxCreateCookie('mawebhlbr', basketRef, date.toGMTString())
              tpxDeleteCookie('mawuli')
            }

            gProjectListLoaded = true
            gProjectListCount = responseObj.basketcount

            break
          case 'tpxHighLevelLogoutControl':

            tpxDeleteCookie('mawuli')
            tpxDeleteCookie('mawebhlbr')

            gBasketCount = 0
            gProjectListCount = 0

            break
          case 'tpxHighLevelCheckoutControl':
            if (responseObj.result != 0) {
              tpxDeleteCookie('mawuli')
              tpxDeleteCookie('mawebhlbr')

              gBasketCount = 0
              gProjectListCount = 0
            }

            break
          case 'tpxHighLevelEditProjectControl':

            if ((responseObj.result != 0) && (responseObj.ssoerror)) {
              tpxDeleteCookie('mawuli')
              tpxDeleteCookie('mawebhlbr')

              gBasketCount = 0
              gProjectListCount = 0
            }

            break
          case 'tpxHighLevelRemoveItemFromBasketControl':
            if ((gBasketCount > 0) && (responseObj.result === 0)) {
              gBasketCount--
            }

            gProjectListLoaded = false

            break
          case 'tpxHighLevelEmptyBasketControl':
            gBasketCount = 0
            gProjectListLoaded = false
            break
        }

        if (pRequestFunction == 'tpxHighLevelRenameProjectControl') {
          callback(responseObj, pParams['fromprojectlist'])
        } else {
          callback(responseObj)
        }
      }
    }

    if (requestMethod == 'POST') {
      xmlhttp.send(postParams)
    } else {
      xmlhttp.send(null)
    }
  } else {
    	responseObj = {}
    	callback(responseObj)
  }
}

function tpxHighLevelCreateProjectControl (pURLParams) {
  var paramArray = new Object()
  paramArray['id'] = pURLParams
  paramArray['ssoenabled'] = gSSOEnabled

  paramArray = tpxAddGoogleTrackingParameter(paramArray, function (pParamArray) {
    tpxHighLevelProcessRequest('tpxHighLevelCreateProjectControl', true, pParamArray, {})
  })

  return false
}

function tpxHighLevelCreateProjectView (pJsonResponseObject) {
  if ((pJsonResponseObject.result == 0) || (pJsonResponseObject.result == -2)) {
    onlineDesignURL = pJsonResponseObject.designurl

    if (pJsonResponseObject.result == -2) {
      onlineDesignURL = onlineDesignURL
    }

    window.location = onlineDesignURL
  } else {
    var resultAlert = {
      body: '<p>' + pJsonResponseObject.resultmessage + '</p>',
      buttons: {
        action: {
          title: tpxGetLocaleString(kStr_ButtonOK),
          fn: function () {
            if ((pJsonResponseObject.redirecturl) && (pJsonResponseObject.redirecturl != '')) {
              document.location = pJsonResponseObject.redirecturl
            } else {
              basicModal.close()
            }
          }
        }
      }
    }

    basicModal.show(resultAlert)
  }

  return false
}

function tpxHighLevelCheckUserSessionControl (pLookUpToken) {
  var paramArray = new Object()
  paramArray['lookuptoken'] = pLookUpToken
  paramArray['ssoenabled'] = gSSOEnabled

  tpxHighLevelProcessRequest('tpxHighLevelCheckUserSessionControl', true, paramArray, {})

  return false
}

function tpxHighLevelCheckUserSessionView (pJsonResponseObject) {
  if (pJsonResponseObject.result > 0) {
    var resultAlert =
		{
		  body: '<p>' + pJsonResponseObject.resultmessage + '</p>',
		  buttons:
			{
			  action:
				{
				  title: tpxGetLocaleString(kStr_ButtonOK),
				  fn: function () {
				    document.location = pJsonResponseObject.redirecturl
				  }
				}
			}
		}

    basicModal.show(resultAlert)
  }

  return false
}

function tpxHighLevelBasketLocalise () {
  var basketButtonWrapper = document.getElementById('tpx-basketButtonWrapper')

  if (basketButtonWrapper) {
    // basketButtonWrapper.innerHTML = '<a class="tpx tpx-button tpx-basketButton" href="#" id="tpx-basketlink" onClick="tpxBasketOnClick()" ><span class="tpx tpx-basketCount" id="tpx-basketButtonCount">' + gBasketCount + '</span><span class="tpx tpx-basketLabel">' + tpxGetLocaleString(kStr_LabelBasket) + '</span></a>'
    basketButtonWrapper.innerHTML = '<a class="tpx tpx-button tpx-basketButton" href="#" id="tpx-basketlink" onClick="tpxBasketOnClick()" ><span class="tpx tpx-basketCount" id="tpx-basketButtonCount">' + gBasketCount + '</span></a>'
  }

  var emptyBasketButton = document.getElementById('tpx-emptyBasketButton')

  if (emptyBasketButton) {
    emptyBasketButton.innerHTML = tpxGetLocaleString(kStr_ButtonEmptyBasket)
  }

  var checkoutbutton = document.getElementById('tpx-checkoutbutton')

  if (checkoutbutton) {
    checkoutbutton.innerHTML = tpxGetLocaleString(kStr_ButtonCheckout)
  }

  var signIn = document.getElementById('tpx-signIn')

  if (signIn) {
    signIn.innerHTML = tpxGetLocaleString(kStr_LabelSignIn)
  }

  var register = document.getElementById('tpx-register')

  if (register) {
    register.innerHTML = tpxGetLocaleString(kStr_LabelRegister)
  }

  var projectslist = document.getElementById('tpx-projectslist')

  if (projectslist) {
    projectslist.innerHTML = tpxGetLocaleString(kStr_LabelMyProjects)
  }

  var emptyBasketText = document.getElementById('tpx-empty-cart-text')

  if (emptyBasketText) {
    emptyBasketText.innerHTML = tpxGetLocaleString(kStr_BasketIsEmpty)
  }

  var emptyProjectText = document.getElementById('tpx-empty-project-text')

  if (emptyProjectText) {
    emptyProjectText.innerHTML = tpxGetLocaleString(kStr_ProjectIsEmpty)
  }

  return false
}

function tpxHighLevelEditProjectControl (pProjectRef, pCanUnlock, pForceKill) {
  var paramArray = new Object()
  paramArray['projectref'] = pProjectRef
  paramArray['forcekill'] = pForceKill
  paramArray['canunlock'] = pCanUnlock
  paramArray['ssoenabled'] = gSSOEnabled

  paramArray = tpxAddGoogleTrackingParameter(paramArray, function (pParamArray) {
    tpxHighLevelProcessRequest('tpxHighLevelEditProjectControl', true, pParamArray, {})
  })

  return false
}

function tpxHighLevelEditProjectView (pJsonResponseObject) {
  if (pJsonResponseObject.result == 0) {
    onlineDesignURL = pJsonResponseObject.designurl

    if (pJsonResponseObject.result == -2) {
			 onlineDesignURL = onlineDesignURL
    }

    window.location = onlineDesignURL
  } else if (pJsonResponseObject.result == 31) {
    var resultAlert = {
      body: '<p>' + pJsonResponseObject.resultmessage + '</p>',
      buttons: {
        action:
				{
				  title: tpxGetLocaleString(kStr_ButtonContinue),
				  fn: function () {
				    basicModal.close()
				  }
				}
      }
    }
    basicModal.show(resultAlert)
  } else {
    var resultAlert = {
      body: '<p>' + pJsonResponseObject.resultmessage + '</p>',
      buttons: {
        action:
				{
				  title: tpxGetLocaleString(kStr_ButtonContinue),
				  fn: function () {
				    if (pJsonResponseObject.result == 6) {
				      tpxHighLevelEditProjectControl(pJsonResponseObject.projectref, 1, 1)
				    } else {
				      if ((pJsonResponseObject.redirecturl) && (pJsonResponseObject.redirecturl != '')) {
				        document.location = pJsonResponseObject.redirecturl
				      } else {
				        basicModal.close()
				      }
				    }
				  }
				},
        cancel:
				{
				  title: tpxGetLocaleString(kStr_ButtonCancel),
				  fn: basicModal.close
				}
      }
    }

    basicModal.show(resultAlert)
  }

  return false
}

function tpxHighLevelDuplicateProjectControl (pProjectRef, pCurrentProjectName) {
  var paramArray = new Object()
  paramArray['projectref'] = pProjectRef

  var projectNameInput = {
    body: '<p>' + tpxGetLocaleString(kStr_LabelProjectName) + ':</p><input class="basicModal__text" type="text" name="tpxprojectname" placeholder="' + tpxGetLocaleString(kStr_LabelProjectName) + ' "value="' + pCurrentProjectName + '">',
    buttons: {
      cancel: {
        title: tpxGetLocaleString(kStr_ButtonCancel),
        fn: basicModal.close
      },
      action: {
        title: tpxGetLocaleString(kStr_ButtonContinue),
        fn: function (data) {
          if (data.tpxprojectname.length < 1) {
            return basicModal.error('tpxprojectname')
          } else {
            paramArray['projectname'] = data.tpxprojectname
            tpxHighLevelProcessRequest('tpxHighLevelDuplicateProjectControl', false, paramArray, {})
          }

          basicModal.close()
        }
      }
    }
  }

  basicModal.show(projectNameInput)

  return false
}

function tpxHighLevelDuplicateProjectView (pJsonResponseObject) {
  if (pJsonResponseObject.result == 0) {
    tpxHighLevelEditProjectControl(pJsonResponseObject.projectref, 1, 1)
  } else {
    var resultAlert = {
      body: '<p>' + pJsonResponseObject.resultmessage + '</p>',
      buttons: {
        action: {
          title: tpxGetLocaleString(kStr_ButtonOK),
          fn: basicModal.close
        }
      }
    }

    basicModal.show(resultAlert)
  }

  return false
}

function tpxHighLevelRenameProjectControl (pItemID, pProjectRef, pFromProjectList) {
  var paramArray = new Object()

  paramArray['projectref'] = pProjectRef
  paramArray['basketitemidtoupdate'] = pItemID

  var itemIDPrefix = ''

  if (pFromProjectList) {
    itemIDPrefix = 'projectlist'
  }

  var projectName = document.getElementById('tpx-' + itemIDPrefix + 'item-renameproject-' + pItemID).getAttribute('data-projectname')

  var projectNameInput = {
    body: '<p>' + tpxGetLocaleString(kStr_LabelRenameProject) + ':</p><input class="basicModal__text" type="text" name="tpxprojectname" placeholder="' + tpxGetLocaleString(kStr_LabelProjectName) + '" value="' + projectName + '">',
    buttons: {
      cancel: {
        title: tpxGetLocaleString(kStr_ButtonCancel),
        fn: basicModal.close
      },
      action: {
        title: tpxGetLocaleString(kStr_ButtonContinue),
        fn: function (data) {
          if (data.tpxprojectname.length < 1) {
            return basicModal.error('tpxprojectname')
          } else {
            paramArray['newname'] = data.tpxprojectname
            paramArray['fromprojectlist'] = pFromProjectList
            tpxHighLevelProcessRequest('tpxHighLevelRenameProjectControl', false, paramArray, {})
          }

          basicModal.close()
        }
      }
    }
  }

  basicModal.show(projectNameInput)
}

function tpxHighLevelRenameProjectView (pJsonResponseObject, pFromProjectList) {
  if (pJsonResponseObject.result == 0) {
    var itemIDPrefix = ''

    if (pFromProjectList) {
      itemIDPrefix = 'projectlist'
    }

    document.getElementById('tpx-' + itemIDPrefix + 'item-projectname-' + pJsonResponseObject.basketitemidtoupdate).innerHTML = pJsonResponseObject.newprojectname
    document.getElementById('tpx-' + itemIDPrefix + 'item-renameproject-' + pJsonResponseObject.basketitemidtoupdate).setAttribute('data-projectname', pJsonResponseObject.newprojectname)
  } else {
    var resultAlert = {
      body: '<p>' + pJsonResponseObject.resultmessage + '</p>',
      buttons: {
        action: {
          title: tpxGetLocaleString(kStr_ButtonOK),
          fn: basicModal.close
        }
      }
    }

    basicModal.show(resultAlert)
  }

  return false
}

function tpxHighLevelDeleteProjectControl (pItemID, pProjectRef, pProjectName, pCanUnlock, pForceKill) {
  var paramArray = new Object()
  paramArray['projectref'] = pProjectRef
  paramArray['forcekill'] = pForceKill
  paramArray['canunlock'] = pCanUnlock
  paramArray['itemtoremoveid'] = pItemID

  var projectName = document.getElementById('tpx-projectlistitem-renameproject-' + pItemID).getAttribute('data-projectname')

  var deleteProjectPrompt = {
    body: '<p>' + tpxParamString(tpxGetLocaleString(kStr_MessageDeleteProjectConfirmation), projectName) + '</p>',
    buttons: {
      cancel: {
        title: tpxGetLocaleString(kStr_ButtonNo),
        fn: basicModal.close
      },
      action: {
        title: tpxGetLocaleString(kStr_ButtonYes),
        fn: function (data) {
          tpxHighLevelProcessRequest('tpxHighLevelDeleteProjectControl', false, paramArray, {})

          basicModal.close()
        }
      }
    }
  }

  basicModal.show(deleteProjectPrompt)

  if (gProjectListCount === 0) {
    document.getElementById('tpx-empty-state').style.visibility = 'visible'
  }

  return false
}

function tpxHighLevelDeleteProjectView (pJsonResponseObject) {
  if (pJsonResponseObject.result == 0) {
    var parentNode = document.getElementById('tpx-projectsItemList')
    var nodeToRemove = document.getElementById('tpx-projectlistitem' + pJsonResponseObject.itemtoremoveid)

    parentNode.removeChild(nodeToRemove)
  } else {
    var resultAlert = {
      body: '<p>' + pJsonResponseObject.resultmessage + '</p>',
      buttons: {
        action: {
          title: tpxGetLocaleString(kStr_ButtonOK),
          fn: basicModal.close
        }
      }
    }

    basicModal.show(resultAlert)
  }

  tpxCreateBasketCountCookie()

  return false
}

function tpxHighLevelShareProjectControl (pProjectRef) {
  var paramArray = new Object()
  paramArray['projectref'] = pProjectRef

  tpxHighLevelProcessRequest('tpxHighLevelShareProjectControl', false, paramArray, {})
}

function tpxHighLevelShareProjectView (pJsonResponseObject) {
  var copySupportedByBrowser = tpxGetSupportsExecCommand()
  var inputReadOnly = !!(copySupportedByBrowser)

  var shareProjectInput = {
    body: '<p>' + tpxGetLocaleString(kStr_LabelShareLink) + ':</p><div id="sharelink-tip" class="tip-popout"><p>' + tpxGetLocaleString(kStr_ToolTipLinkCopied) + '</p></div><input class="basicModal__text share-url" type="text" id="tpxsharelink" name="tpxsharelink" placeholder="' + tpxGetLocaleString(kStr_LabelShareLink) + '" value="' + pJsonResponseObject.link + '" readonly= "' + inputReadOnly + '" maxlength="0">',
    buttons: {
      cancel: {
        title: tpxGetLocaleString(kStr_LabelClose),
        fn: basicModal.close
      }
    }
  }

  if (copySupportedByBrowser) {
    shareProjectInput.buttons.action = {
      title: tpxGetLocaleString(kStr_ButtonCopyLink),
      fn: function (data) {
        tpxHandleCopyLinkClick()
        basicModal.reset()
      }
    }
  }

  basicModal.show(shareProjectInput)
}

function tpxHighLevelBasketInitialise () {
  var mawIDLookup = tpxReadCookie('mawhluid')
  var lookUpToken = tpxGetUrlVar('mawbt')
  var basketRef = ''
  var basketRefLookUpValue = tpxReadCookie('mawebhlbr')
  var hlCreateID = tpxGetUrlVar('mawebhlcreate')
  var ssoAction = ''
  var ssoActionParam = []
  var ssoKey = tpxGetUrlVar('ssokey')
  var gwmParam = tpxGetUrlVar('gwm')
  var languageParam = tpxGetUrlVar('l')
  var gdParam = tpxGetUrlVar('gd')
  var wmoParam = tpxGetUrlVar('wmo')
  var wmolsParam = tpxGetUrlVar('wmols')
  var wmossParam = tpxGetUrlVar('wmoss')
  var wmosdParam = tpxGetUrlVar('wmosd')
  var uioParam = tpxGetUrlVar('uio')
  gOldBasketCount = tpxReadCookie('mawhlbc')

  gOldBasketCount = gOldBasketCount || 0

  if (languageParam == '') {
    languageParam = tpxGetBrowserLocale()
  }

  // if the unique high level cookie has not been created then we must create it.
  if ((mawIDLookup == null) || (mawIDLookup == '')) {
    	tpxCreateMAWHLUIDCookie()
  }

   	// Single item workflow has been invoked with Multi Line Basket enabled on the brand
   	// we need to take the user straight into the project
   	if (hlCreateID != '') {
   		var URLParams = 'id=' + hlCreateID

    URLParams += (gwmParam != '') ? '&gwm=' + gwmParam : ''
    URLParams += (languageParam != '') ? '&l=' + languageParam : ''
    URLParams += (gdParam != '') ? '&gd=' + gdParam : ''
    URLParams += (wmoParam != '') ? '&wmo=' + wmoParam : ''
    URLParams += (wmolsParam != '') ? '&wmols=' + wmolsParam : ''
    URLParams += (wmossParam != '') ? '&wmoss=' + wmossParam : ''
    URLParams += (wmosdParam != '') ? '&wmosd=' + wmosdParam : ''
    URLParams += (uioParam != '') ? '&uio=' + uioParam : ''

    // Add the custom parameters that have been passed by url.
    URLParams += tpxCustomParams()

   		tpxHighLevelCreateProjectControl(URLParams)
   		return false
   	}

   	tpxHighLevelBasketLocalise()

   	// check to see if we have a basket cookie and if we have use the cookie value for the basketref.
  if ((basketRefLookUpValue != null) && (basketRefLookUpValue != '')) {
    basketRef = basketRefLookUpValue
  }

  if ((gSSOEnabled != kSSOOff) && (ssoKey != '')) {
    	var cookieData = tpxReadCookie('mawssoa')

    	if (cookieData != null) {
    		var cookieDataArray = cookieData.split('|')

    		if (cookieDataArray.length == 2) {
    			ssoAction = cookieDataArray[0]

    			if (cookieDataArray[1] != '') {
    				ssoActionParam = JSON.parse(cookieDataArray[1])
    			}
    		}
    	}
  }

  tpxDeleteCookie('mawssoa')

  if ((ssoAction != '') && (ssoKey != '')) {
    	if ((ssoAction == 'tpxHighLevelSignInInitControl') && (gSSOEnabled == kSSOAutomatic)) {
    		ssoAction = 'tpxHighLevelSignInInitControl2'
    	}

    	tpxHighLevelProcessRequest(ssoAction, false, ssoActionParam, {'sso': 2, 'ssokey': ssoKey})
  } else {
	    // if the session cookie has a legitimate value && we have been redirected back to the product selector,
	    // or we have a basket ref and the session cookie is still not a legitimate session ref
	    // then we must check to see if the session is still active
	    if ((lookUpToken != '') || ((basketRef != '') || (tpxGetUrlVar('odlo') == 1) || (gSSOEnabled == kSSOAutomatic))) {
	    	if (tpxGetUrlVar('odlo') == 1) {
	    		tpxDeleteCookie('mawebhlbr')
	    	}

	    	tpxHighLevelCheckUserSessionControl(lookUpToken)
	    }
  }
}

function tpxHighLevelLoggedInStatusCallBack (pIsSignedIn) {
  var signInLabel = tpxGetLocaleString(kStr_LabelSignIn)
  var registerLabel = tpxGetLocaleString(kStr_LabelRegister)
  var signInLogoutButtonAction = tpxHighLevelSignInInitControl
  var registerMyAccountButtonAction = tpxHighLevelRegisterInitControl

  if (pIsSignedIn == 1) {
    signInLabel = tpxGetLocaleString(kStr_LabelLogout)
    registerLabel = tpxGetLocaleString(kStr_LabelMyAccount)
    signInLogoutButtonAction = tpxHighLevelLogoutControl
    registerMyAccountButtonAction = tpxHighLevelMyAccountInitControl

    var basketButtonWrapper = document.getElementById('tpx-basketButtonWrapper')

    if (basketButtonWrapper) {
      // basketButtonWrapper.innerHTML = '<a class="tpx tpx-button tpx-basketButton" href="#" id="tpx-basketlink" onClick="tpxBasketOnClick()" ><span class="tpx tpx-basketCount" id="tpx-basketButtonCount">' + gBasketCount + '</span><span class="tpx tpx-basketLabel">' + tpxGetLocaleString(kStr_LabelBasket) + '</span></a>'
      basketButtonWrapper.innerHTML = '<a class="tpx tpx-button tpx-basketButton" href="#" id="tpx-basketlink" onClick="tpxBasketOnClick()" ><span class="tpx tpx-basketCount" id="tpx-basketButtonCount">' + gBasketCount + '</span></a>'
    }
  } else {
    var basketCountElement = document.getElementById('tpx-basketcountbadgeinner')

    if (basketCountElement) {
      basketCountElement.innerHTML = gBasketCount
    }

    var basketList = document.getElementById('tpx-basketItemList')

    if (basketList) {
      basketList.innerHTML = ''
    }

    var projectList = document.getElementById('tpx-projectsItemList')

    if (projectList) {
      projectList.innerHTML = ''
    }
  }

  var signInButton = document.getElementById('tpx-signIn')

  if (signInButton) {
    signInButton.innerHTML = signInLabel
    signInButton.onclick = signInLogoutButtonAction
  }

  var registerButton = document.getElementById('tpx-register')

  if (registerButton) {
    registerButton.innerHTML = registerLabel
    registerButton.onclick = registerMyAccountButtonAction
  }

  var basketButtonWrapper = document.getElementById('tpx-basketButtonWrapper')

  if (basketButtonWrapper) {
    document.getElementById('tpx-basketButtonCount').innerHTML = gBasketCount
  }

  var newBasketCount = gBasketCount

  if ((newBasketCount > gOldBasketCount) && (!tpxGetUrlVar('mawbt')) && (gContinueShoppingMessageEnabled)) {
    basicModal.show(
      {
        body: '<p>' + tpxGetLocaleString(kStr_MessageProjectAddedToBasket) + '</p>',
        closable: true,
        buttons:
			{
			  cancel:
				{
				  title: tpxGetLocaleString(kStr_ButtonContinueShopping),
				  fn: basicModal.close
				},
			  action:
				{
				  title: tpxGetLocaleString(kStr_ButtonCheckoutNow),
				  fn: tpxHighLevelCheckoutControl
				}
			}
      })
  }
}

function tpxHighLevelLogoutControl () {
  tpxHighLevelProcessRequest('tpxHighLevelLogoutControl', false, {}, {})

  return false
}

function tpxHighLevelLogoutView (pJsonResponseObject) {
  if ((pJsonResponseObject.result == 0) || (pJsonResponseObject.result == -2)) {
    if ((pJsonResponseObject.result == -2) && (pJsonResponseObject.ssoredirect != '')) {
      document.location = pJsonResponseObject.ssoredirect
    } else {
      tpxHighLevelLoggedInStatusCallBack(0)
    }
  }

  return false
}

function tpxHighLevelGetBasketContentsControl () {
  tpxHighLevelProcessRequest('tpxHighLevelGetBasketContentsControl', false, {}, {})

  return false
}

function tpxHighLevelGetBasketContentsView (pJsonResponseObject) {
  var responseEmpty = tpxIsEmpty(pJsonResponseObject)

  if ((gBasketCount > 0) && (!responseEmpty)) {
    var basketItems = pJsonResponseObject.items

    var basketCountBadgeInner = document.getElementById('tpx-basketcountbadgeinner')

    if (basketCountBadgeInner) {
      basketCountBadgeInner.innerHTML = gBasketCount
    }

    for (var i = 0; i < gBasketCount; i++) {
      var currentProjectRef = basketItems[i].projectref

      var listItemElement = document.createElement('li')
      listItemElement.className = 'tpx-clearfix'
      listItemElement.id = 'tpx-basketitem' + (i + 1)
      listItemElement.setAttribute('data-projectref', basketItems[i].projectref)

      var projectInfoContainerElement = document.createElement('div')
      projectInfoContainerElement.className = 'tpx-projectinfocontainer'

      var infoContainerElemet = document.createElement('div')
      infoContainerElemet.className = 'tpx-infocontainer'

      var projectNameElement = document.createElement('span')

      projectNameElement.className = 'tpx-item-projectname'
      projectNameElement.id = 'tpx-item-projectname-' + (i + 1)

      var projectNameText = document.createTextNode(basketItems[i].projectname)
      projectNameElement.appendChild(projectNameText)

      var layoutNameElement = document.createElement('span')
      layoutNameElement.className = 'tpx-item-layoutname'

      var layoutNameText = document.createTextNode(tpxGetLocaleString(kStr_LabelLayoutName) + ': ' + tpxGetLocaleString(basketItems[i].layoutname))
      layoutNameElement.appendChild(layoutNameText)

      var projectActionsContainer = document.createElement('div')
      projectActionsContainer.id = 'tpx-projectactionscontainer'

      var editProjectLink = document.createElement('a')
      editProjectLink.className = 'tpx-projectaction'
      editProjectLink.href = '#'
      editProjectLink.innerHTML = tpxGetLocaleString(kStr_LabelEdit)

      editProjectLink.onclick = (function () {
        var currentCount = i
        var currentProjectRef = basketItems[i].projectref
        return function () {
          tpxHighLevelEditProjectControl(currentProjectRef, 1, 1)
        }
      })()

      var renameProjectLink = document.createElement('a')
      renameProjectLink.id = 'tpx-item-renameproject-' + (i + 1)
      renameProjectLink.className = 'tpx-projectaction'
      renameProjectLink.href = '#'
      renameProjectLink.innerHTML = tpxGetLocaleString(kStr_LabelRename)
      renameProjectLink.setAttribute('data-projectname', basketItems[i].projectname)
      renameProjectLink.onclick = (function () {
        var currentCount = i
        var currentProjectRef = basketItems[i].projectref

        return function () {
          tpxHighLevelRenameProjectControl((currentCount + 1), currentProjectRef, false)
        }
      })()

      var duplicateProjectLink = document.createElement('a')
      duplicateProjectLink.className = 'tpx-projectaction'
      duplicateProjectLink.href = '#'
      duplicateProjectLink.innerHTML = tpxGetLocaleString(kStr_LabelDuplicate)

      duplicateProjectLink.onclick = (function () {
				 var currentCount = i
				 var currentProjectRef = basketItems[i].projectref
				 var currentProjectName = basketItems[i].projectname
        return function () {
          tpxHighLevelDuplicateProjectControl(currentProjectRef, currentProjectName)
        }
      })()

      var shareProjectLink = document.createElement('a')
      shareProjectLink.className = 'tpx-projectaction'
      shareProjectLink.href = '#'
      shareProjectLink.innerHTML = tpxGetLocaleString(kStr_LabelShare)

      shareProjectLink.onclick = (function () {
				 var currentCount = i
				 var currentProjectRef = basketItems[i].projectref
				 var currentProjectName = basketItems[i].projectname
        return function () {
          tpxHighLevelShareProjectControl(currentProjectRef)
        }
      })()

      projectActionsContainer.appendChild(editProjectLink)
      projectActionsContainer.appendChild(renameProjectLink)
      projectActionsContainer.appendChild(duplicateProjectLink)
      projectActionsContainer.appendChild(shareProjectLink)

      var removeFromBasketElement = document.createElement('div')
      removeFromBasketElement.className = 'tpx-removefrombasket'

      removeFromBasketElement.onclick = (function () {
        var currentCount = i
        var currentProjectRef = basketItems[i].projectref

        var removePopup = {
          body: '<p>' + tpxGetLocaleString(kStr_MessageRemoveItemFromBasketPopupMessage) + '</p>',
          buttons: {
            cancel: {
              title: tpxGetLocaleString(kStr_ButtonCancel),
              fn: function () {
                basicModal.close()
              }
            },
            action: {
              title: tpxGetLocaleString(kStr_ButtonRemoveItem),
              fn: function (data) {
                tpxHighLevelRemoveItemFromBasketControl('tpx-basketitem' + (currentCount + 1), currentProjectRef, 0)
                basicModal.close()

                // If the basket count is now zero display the empty cart message.
                if (gBasketCount == 0) {
                  tpxCreateBasketCountCookie()

                  document.getElementById('tpx-basketcountbadgeinner').style.visibility = 'hidden'
                  document.getElementById('tpx-emptyBasketButton').style.visibility = 'hidden'
                  document.getElementById('tpx-checkoutbutton').style.visibility = 'hidden'
                  document.getElementById('tpx-empty-cart').style.visibility = 'visible'
                }
              }
            }
          }
        }

        return function () {
          basicModal.show(removePopup)
          return false
        }
      })()

      infoContainerElemet.appendChild(projectNameElement)
      infoContainerElemet.appendChild(layoutNameElement)
      infoContainerElemet.appendChild(projectActionsContainer)

      projectInfoContainerElement.appendChild(infoContainerElemet)
      projectInfoContainerElement.appendChild(removeFromBasketElement)

      listItemElement.appendChild(projectInfoContainerElement)

      var basketItemContainer = document.getElementById('tpx-basketItemList')
      basketItemContainer.appendChild(listItemElement)

      document.getElementById('tpx-basketcountbadgeinner').style.visibility = 'visible'
      document.getElementById('tpx-emptyBasketButton').style.visibility = 'visible'
      document.getElementById('tpx-checkoutbutton').style.visibility = 'visible'
      document.getElementById('tpx-empty-cart').style.visibility = 'hidden'
    }
  } else if (gBasketCount === 0) {
    document.getElementById('tpx-basketcountbadgeinner').style.visibility = 'hidden'
    document.getElementById('tpx-emptyBasketButton').style.visibility = 'hidden'
    document.getElementById('tpx-checkoutbutton').style.visibility = 'hidden'
    document.getElementById('tpx-empty-cart').style.visibility = 'visible'
  }

  // hide the loading spinner
  document.getElementById('tpx-loadingspinnercontainer').style.display = 'none'

  return false
}

function tpxHighLevelGetProjectListControl () {
  tpxHighLevelProcessRequest('tpxHighLevelGetProjectListControl', false, {}, {})

  return false
}

function tpxHighLevelGetProjectListView (pJsonResponseObject) {
  var responseEmpty = tpxIsEmpty(pJsonResponseObject)

  if ((gProjectListCount > 0) && (!responseEmpty)) {
    var projectListItemContainer = document.getElementById('tpx-projectsItemList')
    projectListItemContainer.innerHTML = ''

    var basketItems = pJsonResponseObject.items

    for (var i = 0; i < gProjectListCount; i++) {
      var currentProjectRef = basketItems[i].projectref

      var listItemElement = document.createElement('li')
      listItemElement.className = 'tpx-clearfix'
      listItemElement.id = 'tpx-projectlistitem' + (i + 1)
      listItemElement.setAttribute('data-projectref', basketItems[i].projectref)

      var projectInfoContainerElement = document.createElement('div')
      projectInfoContainerElement.className = 'tpx-projectinfocontainer'

      var infoContainerElemet = document.createElement('div')
      infoContainerElemet.className = 'tpx-infocontainer'

      var projectNameElement = document.createElement('span')
      projectNameElement.className = 'tpx-item-projectname'
      projectNameElement.id = 'tpx-projectlistitem-projectname-' + (i + 1)

      var projectNameText = document.createTextNode(basketItems[i].projectname)
      projectNameElement.appendChild(projectNameText)

      var layoutNameElement = document.createElement('span')
      layoutNameElement.className = 'tpx-item-layoutname'

      var layoutNameText = document.createTextNode(tpxGetLocaleString(kStr_LabelLayoutName) + ': ' + tpxGetLocaleString(basketItems[i].layoutname))
      layoutNameElement.appendChild(layoutNameText)

      var projectActionsContainer = document.createElement('div')
      projectActionsContainer.id = 'tpx-projectlistactionscontainer'

      var editProjectLink = document.createElement('a')
      editProjectLink.className = 'tpx-projectaction'
      editProjectLink.href = '#'
      editProjectLink.innerHTML = tpxGetLocaleString(kStr_LabelEdit)

      editProjectLink.onclick = (function () {
        var currentCount = i
        var currentProjectRef = basketItems[i].projectref
        return function () {
          tpxHighLevelEditProjectControl(currentProjectRef, 1, 1)
        }
      })()

      var renameProjectLink = document.createElement('a')
      renameProjectLink.id = 'tpx-projectlistitem-renameproject-' + (i + 1)
      renameProjectLink.className = 'tpx-projectaction'
      renameProjectLink.href = '#'
      renameProjectLink.innerHTML = tpxGetLocaleString(kStr_LabelRename)
      renameProjectLink.setAttribute('data-projectname', basketItems[i].projectname)

      renameProjectLink.onclick = (function () {
        var currentCount = i
        var currentProjectRef = basketItems[i].projectref

        return function () {
          tpxHighLevelRenameProjectControl((currentCount + 1), currentProjectRef, true)
        }
      })()

      var duplicateProjectLink = document.createElement('a')
      duplicateProjectLink.className = 'tpx-projectaction'
      duplicateProjectLink.href = '#'
      duplicateProjectLink.innerHTML = tpxGetLocaleString(kStr_LabelDuplicate)

      duplicateProjectLink.onclick = (function () {
				 var currentCount = i
				 var currentProjectRef = basketItems[i].projectref
				 var currentProjectName = basketItems[i].projectname
        return function () {
          tpxHighLevelDuplicateProjectControl(currentProjectRef, currentProjectName)
        }
      })()

      var deleteProjectLink = document.createElement('a')
      deleteProjectLink.className = 'tpx-projectaction'
      deleteProjectLink.href = '#'
      deleteProjectLink.innerHTML = tpxGetLocaleString(kStr_LabelDelete)

      deleteProjectLink.onclick = (function () {
				 var currentCount = i
				 var currentProjectRef = basketItems[i].projectref
				 var currentProjectName = basketItems[i].projectname
        return function () {
          tpxHighLevelDeleteProjectControl((currentCount + 1), currentProjectRef, currentProjectName, 1, 0)
        }
      })()

      projectActionsContainer.appendChild(editProjectLink)
      projectActionsContainer.appendChild(renameProjectLink)
      projectActionsContainer.appendChild(duplicateProjectLink)
      projectActionsContainer.appendChild(deleteProjectLink)

      if (basketItems[i].projectsaved == 1) {
        var shareProjectLink = document.createElement('a')
        shareProjectLink.className = 'tpx-projectaction'
        shareProjectLink.href = '#'
        shareProjectLink.innerHTML = tpxGetLocaleString(kStr_LabelShare)

        shareProjectLink.onclick = (function () {
					 var currentCount = i
					 var currentProjectRef = basketItems[i].projectref
					 var currentProjectName = basketItems[i].projectname
          return function () {
            tpxHighLevelShareProjectControl(currentProjectRef)
          }
        })()

        projectActionsContainer.appendChild(shareProjectLink)
      }

      infoContainerElemet.appendChild(projectNameElement)
      infoContainerElemet.appendChild(layoutNameElement)
      infoContainerElemet.appendChild(projectActionsContainer)

      projectInfoContainerElement.appendChild(infoContainerElemet)

      listItemElement.appendChild(projectInfoContainerElement)
      projectListItemContainer.appendChild(listItemElement)

      document.getElementById('tpx-empty-state').style.visibility = 'hidden'
    }
  } else if (gProjectListCount === 0) {
    document.getElementById('tpx-empty-state').style.visibility = 'visible'
  }

  // hide the loading spinner
  document.getElementById('tpx-projectloadingspinnercontainer').style.display = 'none'

  return false
}

function tpxHighLevelRemoveItemFromBasketControl (pItemID, pProjectRef, pForceKill) {
  var paramArray = new Object()
  paramArray['itemtoremoveid'] = pItemID
  paramArray['projectref'] = pProjectRef
  paramArray['forcekill'] = pForceKill

  tpxHighLevelProcessRequest('tpxHighLevelRemoveItemFromBasketControl', false, paramArray, {})

  return false
}

function tpxHighLevelRemoveItemFromBasketView (pJsonResponseObject) {
  if (pJsonResponseObject.result == 32) {
    var removeProjectPrompt = {
      body: '<p>' + tpxParamString(tpxGetLocaleString(kStr_MessageProjectOpenInShoppingCart)) + '</p>',
      buttons: {
        cancel: {
          title: tpxGetLocaleString(kStr_ButtonCancel),
          fn: basicModal.close
        },
        action: {
          title: tpxGetLocaleString(kStr_ButtonContinue),
          fn: function (data) {
            tpxHighLevelRemoveItemFromBasketControl(pJsonResponseObject.itemtoremoveid, pJsonResponseObject.projectref, 1)

            basicModal.close()
          }
        }
      }
    }

    basicModal.show(removeProjectPrompt)
  } else if (pJsonResponseObject.result == 0) {
    var parentNode = document.getElementById('tpx-basketItemList')
    var nodeToRemove = document.getElementById(pJsonResponseObject.itemtoremoveid)

    parentNode.removeChild(nodeToRemove)

    var basketCountElement = document.getElementById('tpx-basketcountbadgeinner')
    basketCountElement.innerHTML = gBasketCount

    var basketButtonWrapper = document.getElementById('tpx-basketButtonWrapper')

    if (basketButtonWrapper) {
      document.getElementById('tpx-basketButtonCount').innerHTML = gBasketCount
    }
  } else {
    var resultAlert = {
      body: '<p>' + pJsonResponseObject.resultmessage + '</p>',
      buttons: {
        action: {
          title: tpxGetLocaleString(kStr_ButtonOK),
          fn: basicModal.close
        }
      }
    }

    basicModal.show(resultAlert)
  }

  tpxCreateBasketCountCookie()

  return false
}

function tpxHighLevelEmptyBasketControl () {
  var emptyBasketPopup = {
    body: '<p>' + tpxGetLocaleString(kStr_MessageEmptyBasketPopupMessage) + '</p>',
    buttons: {
      cancel: {
        title: tpxGetLocaleString(kStr_ButtonCancel),
        fn: function () {
          basicModal.close()
        }
      },
      action: {
        title: tpxGetLocaleString(kStr_ButtonEmptyBasket),
        fn: function (data) {
          var paramArray = new Object()
          paramArray['forcekill'] = 1
          tpxHighLevelProcessRequest('tpxHighLevelEmptyBasketControl', false, paramArray, {})
          tpxCreateBasketCountCookie()

          document.getElementById('tpx-basketcountbadgeinner').style.visibility = 'hidden'
          document.getElementById('tpx-emptyBasketButton').style.visibility = 'hidden'
          document.getElementById('tpx-checkoutbutton').style.visibility = 'hidden'
          document.getElementById('tpx-empty-cart').style.visibility = 'visible'
          basicModal.close()
        }
      }
    }
  }

  basicModal.show(emptyBasketPopup)

  return false
}

function tpxHighLevelEmptyBasketView (pJsonResponseObject) {
  if (pJsonResponseObject.result == 32) {
    var removeProjectPrompt = {
      body: '<p>' + tpxParamString(tpxGetLocaleString(kStr_MessageProjectOpenInShoppingCart)) + '</p>',
      buttons: {
        cancel: {
          title: tpxGetLocaleString(kStr_ButtonCancel),
          fn: basicModal.close
        },
        action: {
          title: tpxGetLocaleString(kStr_ButtonContinue),
          fn: function (data) {
            tpxHighLevelProcessRequest('tpxHighLevelEmptyBasketControl', false, {forcekill: 1}, {})
            basicModal.close()
          }
        }
      }
    }

    basicModal.show(removeProjectPrompt)
  }

  if (pJsonResponseObject.result == 0) {
    var basketList = document.getElementById('tpx-basketItemList')
    basketList.innerHTML = ''

    var basketCountElement = document.getElementById('tpx-basketcountbadgeinner')
    basketCountElement.innerHTML = gBasketCount

    var basketButtonWrapper = document.getElementById('tpx-basketButtonWrapper')

    if (basketButtonWrapper) {
      document.getElementById('tpx-basketButtonCount').innerHTML = gBasketCount
    }
  } else {
    var resultAlert = {
      body: '<p>' + pJsonResponseObject.resultmessage + '</p>',
      buttons: {
        action: {
          title: tpxGetLocaleString(kStr_ButtonOK),
          fn: basicModal.close
        }
      }
    }

    basicModal.show(resultAlert)
  }

  return false
}

function tpxHighLevelCheckoutControl () {
  var paramArray = new Object()
  paramArray['ssoenabled'] = gSSOEnabled

  tpxHighLevelProcessRequest('tpxHighLevelCheckoutControl', true, paramArray, {})

  return false
}

function tpxHighLevelCheckoutView (pJsonResponseObject) {
  if (pJsonResponseObject.result == 0) {
    shoppingCartURL = pJsonResponseObject.shoppingcarturl

    window.location.replace(shoppingCartURL)
  } else {
    var resultAlert =
		{
		  body: '<p>' + pJsonResponseObject.resultmessage + '</p>',
		  buttons:
			{
			  action:
				{
				  title: tpxGetLocaleString(kStr_ButtonOK),
				  fn: basicModal.close
				}
			}
		}

    basicModal.show(resultAlert)
  }

  return false
}

function tpxHighLevelSignInInitControl () {
  var paramArray = new Object()
  paramArray['groupcode'] = ''
  paramArray['ssoenabled'] = gSSOEnabled

  tpxHighLevelProcessRequest('tpxHighLevelSignInInitControl', true, paramArray, {})

  return false
}

function tpxHighLevelSignInInitView (pJsonResponseObject) {
  if ((pJsonResponseObject.result == 0) || (pJsonResponseObject.result == -2)) {
    var signInURL = pJsonResponseObject.signinurl

    if (signInURL != '') {
      window.location = signInURL
    } else {
		    var isLoggedInLookUpValue = tpxReadCookie('mawuli')

		    tpxHighLevelLoggedInStatusCallBack(isLoggedInLookUpValue)
    }
  } else {
    var resultAlert = {
      body: '<p>' + pJsonResponseObject.resultmessage + '</p>',
      buttons: {
        action: {
          title: tpxGetLocaleString(kStr_ButtonOK),
          fn: basicModal.close
        }
      }
    }

    basicModal.show(resultAlert)
  }

  return false
}

function tpxHighLevelRegisterInitControl () {
  var paramArray = new Object()
  paramArray['groupcode'] = ''

  tpxHighLevelProcessRequest('tpxHighLevelRegisterInitControl', false, paramArray, {})

  return false
}

function tpxHighLevelRegisterInitView (pJsonResponseObject) {
  if (pJsonResponseObject.result == 0) {
    registerURL = pJsonResponseObject.signinurl
    window.location = registerURL
  } else {
    var resultAlert = {
      body: '<p>' + pJsonResponseObject.resultmessage + '</p>',
      buttons: {
        action: {
          title: tpxGetLocaleString(kStr_ButtonOK),
          fn: basicModal.close
        }
      }
    }

    basicModal.show(resultAlert)
  }

  return false
}

function tpxHighLevelMyAccountInitControl () {
  tpxHighLevelProcessRequest('tpxHighLevelMyAccountInitControl', false, {}, {})

  return false
}

function tpxHighLevelMyAccountInitView (pJsonResponseObject) {
  if (pJsonResponseObject.result == 0) {
    myAccountURL = pJsonResponseObject.myaccounturl
    window.location = myAccountURL
  } else {
    var resultAlert = {
      body: '<p>' + pJsonResponseObject.resultmessage + '</p>',
      buttons: {
        action: {
          title: tpxGetLocaleString(kStr_ButtonOK),
          fn: basicModal.close
        }
      }
    }

    basicModal.show(resultAlert)
  }

  return false
}

function tpxBasketOnClick () {
  var cartContainer = document.getElementById('tpx-shoppingcartcontents')

  if (cartContainer.style.display == 'block') {
    var basketItemContainer = document.getElementById('tpx-basketItemList')
    cartContainer.style.display = 'none'

    document.getElementById('tpx-loadingspinnercontainer').style.display = 'block'
  } else {
    cartContainer.style.display = 'block'
    tpxHighLevelGetBasketContentsControl()
  }

  return false
}

function tpxMyProjectsOnClick () {
  var projectListContainer = document.getElementById('tpx-projectlistcontents')

  if (projectListContainer.style.display == 'block') {
    var projectItemContainer = document.getElementById('tpx-projectsItemList')
    projectListContainer.style.display = 'none'

    document.getElementById('tpx-projectloadingspinnercontainer').style.display = 'block'
  } else {
    projectListContainer.style.display = 'block'
    tpxHighLevelGetProjectListControl()

    var basketBarInner = document.getElementById('tpx-basket-bar-inner').getBoundingClientRect()
    var myProjectsButtonBounds = document.getElementById('tpx-projectslist').getBoundingClientRect()
    var projectContainerBounds = projectListContainer.getBoundingClientRect()

    var left = ((myProjectsButtonBounds.left + myProjectsButtonBounds.width) - (projectContainerBounds.width)) - (basketBarInner.left)
    var right = projectContainerBounds.width + left

    if (left < 0) {
      left = 10
    }

    var viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)

    if ((viewportWidth < 780)) {
      // left = (basketBarInner.width - projectContainerBounds.width) / 2
      left = 0
    }

    document.getElementById('tpx-projectlistcontents').style.left = left + 'px'
  }
}

function tpxCustomParams () {
  var additionalParams = ''
  // Get the query string and strip of the first character (?)
  var query = window.location.search.substr(1)

  // Split the remaining string into each param.
  query.split('&').forEach(function (part) {
    // If the param starts with cp append this to the additional parameters.
    if (part.substr(0, 2) == 'cp') {
      additionalParams += '&' + part
    }
  })

  return additionalParams
}