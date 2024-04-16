## casos de usos da aplicação
[x] - Cadastro de usuário.
[x] - Login de usuário

## Cadastro de animal.
Como usuário, desejo realizar cadastro do meu pet no aplicativo. O pet contém as seguintes caracteristicas
- Nome
- Idade em meses
- Especie
- Sexo
- Raça (se tiver)
- Peso - Pode ter mais de uma pesagem, uma vez que ele pode estar em evolução.

Além do mais, quero também gerar a carteira de vácina dele. A cartira contém as seguintes informaçoes
- Vacina (exemplo: V10, V8)
- Data de aplicaçao
- aplicado = false (default)

Porém a criação dessa carteirinha deve ser automatizada, ou seja, se o animal não tiver tomado nenhuma vácina, o sistema
deve gerar a carteira com as vácinas que o mesmo deve tomar.

# Roles para criar a vacina.
- Se o cachorro tiver idade menos de 6 semanas a 9 e nunca tiver tomado vácina, deve se criar as seguintes vácinas;
- V10 (o cachorro tem que tomar 3 vácinas a cada 21 dias)
- gripe oral
- giardia