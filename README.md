# Calculadora
Pràctica de JavaScript
Aquesta aplicació és una calculadora web desenvolupada amb HTML, CSS i JavaScript. Inclou tres tipus de calculadora: normal, decimal i científica. Permet fer operacions bàsiques i avançades, així com personalitzar la configuració de l'usuari.

## Funcionalitats
### 1. Calculadora Normal
La calculadora normal permet realitzar operacions bàsiques com:
- Sumar
- Restar
- Multiplicar
- Dividir
Els valors màxims que es poden introduir a la pantalla d'operacions són 5 dígits.

### 2. Calculadora Decimal
Aquesta calculadora permet realitzar operacions amb decimals. Té les mateixes funcions que la calculadora normal, però permet manejar nombres decimals en les operacions.

### 3. Calculadora Científica
La calculadora científica afegeix funcions matemàtiques més avançades, com:
- Sinus
- Cosinus
- Potència (elevat al quadrat)
- Arrel quadrada
- Percentatges

### 4. Memòria
Permet memoritzar un número i recuperar-lo més tard. També es pot esborrar la memòria quan ja no sigui necessària.

### 5. Configuració de l'Usuari
L'usuari pot configurar el seu nom i el tipus de calculadora que vol utilitzar. La configuració es guarda a `localStorage` per a sessions futures.
Per guardar la configuració, hi ha un formulari amb les següents dades:
1. Omple el teu nom d'usuari a la secció "Nom d'Usuari", és un imput
2. Tria el tipus de calculadora (normal, decimal, científica) amb selected
3. Fes clic al botó "Guardar configuració" o també pots esborrar la configuració guardada

## Funcionament de la Calculadora

### 1. Afegir Números
Els números es poden afegir a la pantalla mitjançant els botons numèrics. La calculadora permet fins a 5 dígits per operand.
### 2. Definir l'Operador
Els operadors disponibles són:
- `+` (sumar)
- `-` (restar)
- `*` (multiplicar)
- `/` (dividir)
Selecciona un operador per realitzar l'operació entre els dos operands.

### 3. Calcular el Resultat
Després d'introduir els dos operands i l'operador, prem el botó de "Resultat" per calcular la resposta de l'operació.

### 4. Esborrar la Pantalla
Prem el botó "C" per esborrar tots els valors introduïts (operand1, operand2 i operador).

### 5. Memòria
- **Memoritzar número**: Guarda el número actual de la pantalla a la memòria.
- **Recuperar número**: Torna a mostrar el número guardat a la pantalla.
- **Esborrar memòria**: Esborra el número guardat a la memòria.
