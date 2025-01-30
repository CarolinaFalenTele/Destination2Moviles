sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("wb.wbappmovi.controller.View1", {
        onInit() {

         this.listTablas();
        },

    
        listTablas: function () {
            var oTable = this.getView().byId("table");
            var oList = this.getView().byId("List");
            
        
            if (!oTable || !oList) {
                console.error("Error: No se encontró la tabla o la lista");
                return;
            }
        
            // Formatear la fecha correctamente para SAP OData
            var dateKey = "2024-06-18T00:00:00";
            var encodedDateKey = encodeURIComponent("datetime'" + dateKey + "'");
        
            // Construcción correcta del path
            var sPath = `/ZTNM_STOCK_PLAN_ENTREGAS(ZBI_VAR_MARCA='27',ZBI_VAR_PROD='',A0CIPM_DATE_KEY_CMP=${encodedDateKey})/Results`;
        
            console.log("Binding Path: ", sPath);
        
            oTable.bindItems({
                path: sPath,
                template: new sap.m.ColumnListItem({
                    cells: [
                        new sap.m.Text({ text: "{ZBI_CCMAR_T}" }),
                        new sap.m.Text({ text: "{ZBI_CMMAT}" }),
                        new sap.m.Text({ text: "{ZBI_CMLAR}" }),
                        new sap.m.Text({ text: "{ZBI_CMLAR_T}" })
                    ]
                })
            });
        
            oList.bindItems({
                path: sPath,
                template: new sap.m.ObjectListItem({
                    title: "{ZBI_CCMAR_T}",
                    number: "{ZBI_CCMAR_T}",
                    numberUnit: "Contract",
                    type: "Active",
                    attributes: [
                        new sap.m.ObjectAttribute({ text: "Stock: {ZBI_CMMAT}" }),
                        new sap.m.ObjectAttribute({ text: "Serie: {ZBI_CMLAR}" }),
                        new sap.m.ObjectAttribute({ text: "ZBI_CMLAR_T: {ZBI_CMLAR_T}" })
                    ]
                })
            });
        },
        
        


        onSearch: function () {
            var oTable = this.getView().byId("table");
            var oList = this.getView().byId("List");
            var oInputProducto = this.getView().byId("inputCompanyCode");
            var oInputMarca = this.getView().byId("inputRecontract");
            var oDatePicker = this.getView().byId("inputMonth");
        
            if (!oTable || !oList) {
                console.error("Error: No se encontró la tabla o la lista");
                return;
            }
        
            // Obtener valores de los filtros
            var sProducto = oInputProducto.getValue();
            var sMarca = oInputMarca.getValue() || "27"; // Valor por defecto
            var sFecha = oDatePicker.getValue(); // Formato: yyyy-MM
        
            if (!sFecha) {
                console.error("Error: Debes seleccionar una fecha.");
                return;
            }
            
            console.log("Fecha" + sFecha);
        
            if (!/^\d{4}-\d{2}-\d{2}$/.test(sFecha)) {  // Verifica formato correcto "YYYY-MM-DD"
                console.error("Error: Formato de fecha incorrecto.");
                return;
            }
        
            var dateKey = sFecha + "T00:00:00"; // Agregar la hora para formato OData
            var encodedDateKey = encodeURIComponent("datetime'" + dateKey + "'");
        
        

            console.log("Fecha completa",encodedDateKey);
        
            // Construcción del path con los valores de los filtros
            var sPath = `/ZTNM_STOCK_PLAN_ENTREGAS(ZBI_VAR_MARCA='${sMarca}',ZBI_VAR_PROD='${sProducto}',A0CIPM_DATE_KEY_CMP=${encodedDateKey})/Results`;
        
            console.log("Binding Path: ", sPath);
        
            oTable.bindItems({
                path: sPath,
                template: new sap.m.ColumnListItem({
                    cells: [
                        new sap.m.Text({ text: "{ZBI_CCMAR_T}" }),
                        new sap.m.Text({ text: "{ZBI_CMMAT}" }),
                        new sap.m.Text({ text: "{ZBI_CMLAR}" }),
                        new sap.m.Text({ text: "{ZBI_CMLAR_T}" })
                    ]
                })
            });
        
            oList.bindItems({
                path: sPath,
                template: new sap.m.ObjectListItem({
                    title: "{ZBI_CCMAR_T}",
                    number: "{ZBI_CCMAR_T}",
                    numberUnit: "Contract",
                    type: "Active",
                    attributes: [
                        new sap.m.ObjectAttribute({ text: "Stock: {ZBI_CMMAT}" }),
                        new sap.m.ObjectAttribute({ text: "Serie: {ZBI_CMLAR}" }),
                        new sap.m.ObjectAttribute({ text: "ZBI_CMLAR_T: {ZBI_CMLAR_T}" })
                    ]
                })
            });


    }
        
    });
});