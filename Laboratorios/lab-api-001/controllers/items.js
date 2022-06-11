exports.createItem = async (req, res) => {
  // #swagger.tags = ['Items']
  /*  #swagger.parameters['obj'] = {
          in: 'body',
          description: 'Add an item',
          schema: { $ref: '#/definitions/CreateItem' }
  } */
  try {
    const itemPayload = req.body;
    res.json(itemPayload);
  } catch (error) {
    res.status(500).json({
      message:
        "Ocurrió un error al crear el artículo. Intente nuevamente. Si el error persiste, contacte al administrador del sistema.",
      error,
    });
  }
};