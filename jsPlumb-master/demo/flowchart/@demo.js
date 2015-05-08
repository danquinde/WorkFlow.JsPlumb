jsPlumb.ready(function () {



    //TODO: DQUINDE Crea los flowchart
     var script =  "<div class='window' id='flowchartWindowStart'><img style='align: bottom' border='0' src='../../img/start.png'><br/></div>";
         script += "<div class='window' id='flowchartWindowRequest'><strong>Request</strong></div>";
         script += "<div class='window' id='flowchartWindowApprove'><strong>Approve</strong></div>";
         script += "<div class='window' id='flowchartWindowNotify'><strong>Notify</strong></div>";
         script += "<div class='window' id='flowchartWindowReview'><strong>Review</strong></div>";
                      
    $("#workflowMain").html(script);

    //$("flowchartWindowStart").css({ "top": "2em", "left": "2em "});


    var instance = jsPlumb.getInstance({
        // default drag options
        DragOptions: { cursor: 'pointer', zIndex: 2000 },
        // the overlays to decorate each connection with.  note that the label overlay uses a function to generate the label text; in this
        // case it returns the 'labelText' member that we set on each connection in the 'init' method below.
        ConnectionOverlays: [
            [ "Arrow", { location: 1 } ],
            [ "Label", {
                location: 0.1,
                id: "label",
                cssClass: "aLabel"
            }]
        ],
        Container: "flowchart-demo"
    });


    //Setea colores en los conectores en los EVENTOS click y hover
    var basicType = {
        connector: "StateMachine",
        paintStyle: { strokeStyle: "red", lineWidth: 4 },
        hoverPaintStyle: { strokeStyle: "blue" },
        overlays: [
            "Arrow"
        ]
    };
    //DQUIDNE: NO eventos click y hover
    //instance.registerConnectionType("basic", basicType);    



    //COLOR DE CONECTOR POR DEFECTO
    // this is the paint style for the connecting lines..
    var connectorPaintStyle =     
    {
            lineWidth: 4,
            strokeStyle: "silver",  //Color de Conectores - NORMAL - CYAN COLOR 61B7CF
            joinstyle: "round",
            outlineColor: "white",
            outlineWidth: 2
    },

    //COLOR CONECTOR OK
    connectorPaintStyleSuccessful =     
    {
            lineWidth: 4,
            strokeStyle: "green",  //Color de Conectores - OK - VERDE
            joinstyle: "round",
            outlineColor: "white",
            outlineWidth: 2
    },

    //COLOR CONECTOR ERROR
    connectorPaintStyleError =     
    {
            lineWidth: 4,
            strokeStyle: "red",  //Color de Conectores - ERROR - ROJO
            joinstyle: "round",
            outlineColor: "white",
            outlineWidth: 2
    },


    // .. and this is the hover style.
        connectorHoverStyle = {
            lineWidth: 4,
            strokeStyle: "#216477", //Color de conectores - HOVER - CYAN OSCURO COLOR
            outlineWidth: 2,
            outlineColor: "white"
        },
        endpointHoverStyle = {
            fillStyle: "#216477",
            strokeStyle: "#216477"
        },

        //SETEO COLOR POR DEFECTO
        // the definition of source endpoints (the small blue ones)
        sourceEndpoint = {
            endpoint: "Dot",
            paintStyle: {
                strokeStyle: "#7AB02C",
                fillStyle: "transparent",
                radius: 7,
                lineWidth: 3
            },
            isSource: true,
            connector: [ "Flowchart", { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true } ],
            connectorStyle: connectorPaintStyle,
            hoverPaintStyle: endpointHoverStyle,
            connectorHoverStyle: connectorHoverStyle,
            dragOptions: {},
            overlays: [
                [ "Label", {
                    location: [0.5, 1.5],
                    label: "Drag",
                    cssClass: "endpointSourceLabel"
                } ]
            ]
        },

        //SETEO COLOR OK
        sourceEndpointSuccessful = {
            endpoint: "Dot",
            paintStyle: {
                strokeStyle: "#7AB02C",
                fillStyle: "transparent",
                radius: 7,
                lineWidth: 3
            },
            isSource: true,
            connector: [ "Flowchart", { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true } ],
            connectorStyle: connectorPaintStyleSuccessful,
            hoverPaintStyle: endpointHoverStyle,
            connectorHoverStyle: connectorHoverStyle,
            dragOptions: {},
            overlays: [
                [ "Label", {
                    location: [0.5, 1.5],
                    label: "Drag",
                    cssClass: "endpointSourceLabel"
                } ]
            ]
        },

        //SETEO COLOR DE ERROR
        sourceEndpointError = {
            endpoint: "Dot",
            paintStyle: {
                strokeStyle: "#7AB02C",
                fillStyle: "transparent",
                radius: 7,
                lineWidth: 3
            },
            isSource: true,
            connector: [ "Flowchart", { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true } ],
            connectorStyle: connectorPaintStyleError,
            hoverPaintStyle: endpointHoverStyle,
            connectorHoverStyle: connectorHoverStyle,
            dragOptions: {},
            overlays: [
                [ "Label", {
                    location: [0.5, 1.5],
                    label: "Drag",
                    cssClass: "endpointSourceLabel"
                } ]
            ]
        },




    // the definition of target endpoints (will appear when the user drags a connection)
        targetEndpoint = {
            endpoint: "Dot",
            paintStyle: { fillStyle: "#7AB02C", radius: 11 },
            hoverPaintStyle: endpointHoverStyle,
            maxConnections: -1,
            dropOptions: { hoverClass: "hover", activeClass: "active" },
            isTarget: true,
            overlays: [
                [ "Label", { location: [0.5, -0.5], label: "Drop", cssClass: "endpointTargetLabel" } ]
            ]
        },
        init = function (connection) {

            //TODO: Etiquetas en los conectores
            connection.getOverlay("label").setLabel(connection.sourceId.substring(15) + " To " + connection.targetId.substring(15));
        };



    //TODO: DQUINDE ESCRIBIR DESDE LA BDD
    var _addEndpoints = function (toId, sourceAnchors, targetAnchors) {
        for (var i = 0; i < sourceAnchors.length; i++) {
            var sourceUUID = toId + sourceAnchors[i];


            var msg = "flowchart" + toId;

            if ( msg == 'flowchartWindowStart' ){
                    instance.addEndpoint("flowchart" + toId, sourceEndpointSuccessful, {
                    anchor: sourceAnchors[i], uuid: sourceUUID
                    });
            }           
           else if ( msg == 'flowchartWindowRequest' ){
                    instance.addEndpoint("flowchart" + toId, sourceEndpointSuccessful, {
                    anchor: sourceAnchors[i], uuid: sourceUUID
                    });
            } /*                
            else if ( msg == 'flowchartWindowApprove' && sourceUUID =='WindowApproveRightMiddle' ){
                    instance.addEndpoint("flowchart" + toId, sourceEndpointSuccessful, {
                    anchor: sourceAnchors[i], uuid: sourceUUID
                    });

                    //alert("Wf: " + msg + " source: " + sourceUUID );
            }            
            else if ( msg == 'flowchartWindowApprove' && sourceUUID =='WindowApproveBottomCenter' ){
                    instance.addEndpoint("flowchart" + toId, sourceEndpointError, {
                    anchor: sourceAnchors[i], uuid: sourceUUID
                    });
            }       */                 
            else{
                    instance.addEndpoint("flowchart" + toId, sourceEndpoint, {
                    anchor: sourceAnchors[i], uuid: sourceUUID
                    });
            }
        }
        for (var j = 0; j < targetAnchors.length; j++) {
            var targetUUID = toId + targetAnchors[j];
            instance.addEndpoint("flowchart" + toId, targetEndpoint, { anchor: targetAnchors[j], uuid: targetUUID });
        }
    };

    // suspend drawing and initialise.
    instance.batch(function () {

        
        //TODO: DQUINDE. Añade Puntos de conexión
        _addEndpoints("WindowRequest", ["RightMiddle", "BottomCenter"], ["LeftMiddle", "TopCenter"]);        
        _addEndpoints("WindowReview",["RightMiddle", "BottomCenter"], ["LeftMiddle", "TopCenter"]);
        _addEndpoints("WindowApprove",["RightMiddle", "BottomCenter"], ["LeftMiddle", "TopCenter"]);
        _addEndpoints("WindowNotify", ["RightMiddle", "BottomCenter"], ["LeftMiddle", "TopCenter"]);
        //START
        _addEndpoints("WindowStart", ["LeftMiddle", "RightMiddle", "TopCenter", "BottomCenter"],[]);
        

        // listen for new connections; initialise them the same way we initialise the connections at startup.
        instance.bind("connection", function (connInfo, originalEvent) {
            init(connInfo.connection);
        });

        // make all the window divs draggable
        instance.draggable(jsPlumb.getSelector(".flowchart-demo .window"), { grid: [20, 20] });
        // THIS DEMO ONLY USES getSelector FOR CONVENIENCE. Use your library's appropriate selector
        // method, or document.querySelectorAll:
        //jsPlumb.draggable(document.querySelectorAll(".window"), { grid: [20, 20] });


        //TODO: DQUINDE. Añade los Conectores
        // connect a few up
        instance.connect({uuids: ["WindowStartRightMiddle", "WindowRequestTopCenter"], editable: true});
        instance.connect({uuids: ["WindowRequestRightMiddle", "WindowApproveLeftMiddle"], editable: true});
        instance.connect({uuids: ["WindowApproveRightMiddle", "WindowNotifyLeftMiddle"], editable: true});
        instance.connect({uuids: ["WindowApproveBottomCenter", "WindowReviewTopCenter"], editable: true});
        instance.connect({uuids: ["WindowReviewBottomCenter", "WindowRequestLeftMiddle"], editable: true});
        
        //
        // listen for clicks on connections, and offer to delete connections on click.
        //
        instance.bind("click", function (conn, originalEvent) {
           // if (confirm("Delete connection from " + conn.sourceId + " to " + conn.targetId + "?"))
             //   instance.detach(conn);
            conn.toggleType("basic");
        });

        instance.bind("connectionDrag", function (connection) {
            console.log("connection " + connection.id + " is being dragged. suspendedElement is ", connection.suspendedElement, " of type ", connection.suspendedElementType);
        });

        instance.bind("connectionDragStop", function (connection) {
            console.log("connection " + connection.id + " was dragged");
        });

        instance.bind("connectionMoved", function (params) {
            console.log("connection " + params.connection.id + " was moved");
        });
    });

    jsPlumb.fire("jsPlumbDemoLoaded", instance);

});