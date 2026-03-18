INSERT INTO authors (name, email, bio) VALUES
    ('Ara Vega', 'arandela@example.com', 'greatest geometry dash player in the world'),
    ('Marino Marino', 'marinero@example.com', 'best bejeweled 3 player'),
    ('Orion Barrionuevo', 'onion@example.com', 'I wont be a rock star, I will be a legend');

INSERT INTO posts (author_id, title, content, published) VALUES
    (1, 'El drama de la alarma', 'Mi despertador y yo tenemos una relacion toxica: el intenta salvar mi carrera y yo lo golpeo sistematicamente cada cinco minutos. Al final me levanto con la energia de un mapache confundido, preguntandome si mi verdadera vocacion en la vida no es, en realidad, ser una manta profesional a tiempo completo.', true),
    (3, 'Viaje a Bariloche en invierno', 'Fuimos en julio y fue la mejor decision. La nieve, el chocolate caliente, los lagos congelados... Es otro mundo. El costo fue razonable si reservas con anticipacion. Ya estamos planeando volver.', true),
    (3, 'Recomendacion: Cafe en el centro de Buenos Aires', 'Descubri un lugar increible en San Telmo. Tienen un flat white espectacular y el ambiente es muy tranquilo para trabajar. Se llama Cafe Baires. Totalmente recomendado!', true),
    (2, 'Receta de tarta de manzana de mi abuela', 'Esta receta tiene mas de 50 anos en mi familia. Los ingredientes son simples: 3 manzanas, harina, azucar, manteca y canela. El secreto esta en dejar reposar la masa 30 minutos antes de hornear.', false),
    (2, 'Deje mi trabajo corporativo para abrir una panaderia', 'Despues de 10 anos en una oficina mirando planillas, renuncie, todo para cumplir mi sueno. Los primeros meses fueron un desastre total, queme mas pan del que vendi. Hoy, un ano despues, tengo fila en la puerta cada manana. No me arrepiento de nada.', false),
    (1, 'Pesadilla en la cocina', 'Segui una receta de 5 minutos y termine con la cocina en llamas, un sensor de humo gritando y una cena que parece carbon activado. Mi unica habilidad culinaria real es tener el numero de la pizzeria guardado en favoritos; al menos ellos no queman el agua.', false);
